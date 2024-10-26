<script setup lang="ts">
/**
 * @file SessionFrame.vue
 * @module SessionFrame
 * Session Frame
 */
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { IVideoController } from '@/controllers/session/videoController.ts'
import { PlayState, VideoState } from '@/model/session/message/videoMessage.ts'
import { useProfileStore } from '@/stores/profile.ts'

const props = defineProps<{
  /**
   * Video Controller used to send/recv synchronization messages
   */
  videoController: IVideoController
  /**
   * Youtube Video ID
   */
  videoId: string
}>()

const profileStore = useProfileStore()

const emit = defineEmits<{
  /**
   * Message to emit whenever the component is ready to recv messages
   */
  frameMounted: []
}>()

const { videoController, videoId } = toRefs(props)
const player = ref<window.YT.Player | null>(null)
const playerActions = ref<((player: window.YT.Player) => void)[]>([])
const playerState = ref<PlayState>(PlayState.PAUSED)

const commUtils = reactive({
  /**
   * Flag to set whenever a player action is executed by the backend
   */
  backendChange: false,
  /**
   * Flag to set whenever a player action is executed by the frontend
   */
  frontendChange: false,
  /**
   * Util variable for handling player state changes
   */
  alreadyPaused: false,
  /**
   * Variable tracking the last stable state
   */
  prevStableState: PlayState.PAUSED
})

watch(
  () => videoId.value,
  () => initializePlayer()
)

watch(
  () => videoId.value,
  async () => {
    try {
      const response = await profileStore.addWatchedVideo(videoId.value)
      if (response) {
        console.log('Video added to watched videos')
      }
    } catch {
      console.log('Error adding video to watched videos')
    }
  }
)

function initializePlayer() {
  new window.YT.Player('player', {
    videoId: videoId.value,
    playerVars: {
      autoplay: 1,
      rel: 0,
      mute: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

/**
 * Executes player actions previously queued, if any.
 */
function handlePlayerActions() {
  while (playerActions.value.length > 0) {
    const playerActionCallback: ((player: window.YT.Player) => void) | undefined =
      playerActions.value.shift()
    if (playerActionCallback && player.value) {
      playerActionCallback(player.value)
    }
  }
}

/**
 * Player ready function.
 * Whenever the Player is ready, executes player actions if some message has been received already.
 * @param event
 */
function onPlayerReady(event) {
  player.value = event.target

  handlePlayerActions()
  watch(
    () => playerActions.value,
    (notifications) => {
      if (notifications.length > 0) {
        handlePlayerActions()
      }
    },
    { deep: true }
  )
}

/**
 * Registers Callbacks to execute whenever Video Controller receives a message
 */
function registerVideoMessageCallbacks() {
  videoController.value.handleVideoNotifications(
    // This function will be executed whenever the backend requests for the current video state.
    () => {
      return new Promise((resolve) => {
        playerActions.value.push((player: window.YT.Player) => {
          resolve({ state: playerState.value, timestamp: player.getCurrentTime() })
        })
      })
    },
    // This function will be executed whenever the backend wants to synchronize the local video.
    (videoState: VideoState) => {
      return new Promise<void>((resolve) => {
        playerActions.value.push((player: window.YT.Player) => {
          player.seekTo(videoState.timestamp, true)
          if (videoState.state == PlayState.PLAYING && playerState.value == PlayState.PAUSED) {
            commUtils.backendChange = true
            playerState.value = PlayState.PLAYING
            player.playVideo()
          } else {
            if (videoState.state == PlayState.PAUSED && playerState.value == PlayState.PLAYING) {
              commUtils.backendChange = true
              playerState.value = PlayState.PAUSED
              player.pauseVideo()
            }
          }
          resolve()
        })
      })
    }
  )
  emit('frameMounted')
}

/**
 * Util function to track the event change source.
 * If it's different from a backend/frontend source, executes f.
 * @param f
 */
function stateChangeActionBySource(f: () => void) {
  if (commUtils.backendChange) {
    commUtils.backendChange = false
  } else {
    if (commUtils.frontendChange) {
      commUtils.frontendChange = false
    } else {
      f()
    }
  }
}

/**
 * Reacts to Player state changes.
 * The Youtube video has to be managed by the synchronization (session) service so:
 * 1. If the video is played by the user, it has to be (locally) stopped, and a message is sent to the backend.
 *    Stopping the will trigger another Player state change, so the frontendChange flag is set.
 * 2. If the video is played by the backend, the backendChange flag is set.
 * Both these two flags allow to discriminate an event change source and avoid sending an infinite amount of messages to the backend.
 * @param event
 */
function onPlayerStateChange(event) {
  switch (event.data) {
    // Video has been played
    case window.YT.PlayerState.PLAYING:
      if (commUtils.prevStableState == PlayState.PAUSED) {
        commUtils.prevStableState = PlayState.PLAYING

        stateChangeActionBySource(() => {
          commUtils.frontendChange = true
          playerState.value = PlayState.PAUSED
          event.target.pauseVideo()
          videoController.value.playVideo(event.target.getCurrentTime())
        })
      }
      break
    // Video has been stopped
    case window.YT.PlayerState.PAUSED:
      if (commUtils.prevStableState == PlayState.PLAYING || commUtils.alreadyPaused) {
        commUtils.alreadyPaused = false
        commUtils.prevStableState = PlayState.PAUSED

        stateChangeActionBySource(() => {
          commUtils.alreadyPaused = true
          videoController.value.stopVideo(event.target.getCurrentTime())
          playerState.value = PlayState.PLAYING
          event.target.playVideo()
        })
      }
      break
    default:
      break
  }
}

/**
 * Register function callbacks to execute at message receiving.
 */
onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = registerVideoMessageCallbacks
  } else {
    registerVideoMessageCallbacks()
  }
})
</script>

<template>
  <div class="responsive-iframe" id="player"></div>
</template>

<style>
.responsive-iframe {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
