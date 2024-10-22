<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { VideoController } from '@/controllers/session/videoController.ts'
import { PlayState, VideoState } from '@/model/video.ts'
import { useProfileStore } from '@/stores/profile.ts'

const props = defineProps<{
  videoController: VideoController
  videoId: string
}>()

const profileStore = useProfileStore()

const emit = defineEmits<{
  frameMounted: []
}>()

const { videoController, videoId } = toRefs(props)
const player = ref<window.YT.Player | null>(null)
const playerActions = ref<((player: window.YT.Player) => void)[]>([])

const commUtils = reactive({
  backendChange: false,
  frontendChange: false,
  alreadyPaused: false,
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
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

function handlePlayerActions() {
  while (playerActions.value.length > 0) {
    const playerActionCallback: ((player: window.YT.Player) => void) | undefined =
      playerActions.value.shift()
    if (playerActionCallback && player.value) {
      playerActionCallback(player.value)
    }
  }
}

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

function registerVideoHandlers() {
  videoController.value.handleVideoNotifications(
    () => {
      return new Promise((resolve) => {
        playerActions.value.push((player: window.YT.Player) => {
          const state: PlayState =
            player.getPlayerState() == window.YT.PlayerState.PLAYING
              ? PlayState.PLAYING
              : PlayState.PAUSED
          resolve({ state: state, timestamp: player.getCurrentTime() })
        })
      })
    },

    (videoState: VideoState) => {
      return new Promise<void>((resolve) => {
        playerActions.value.push((player: window.window.YT.Player) => {
          player.seekTo(videoState.timestamp, true)
          commUtils.backendChange = true
          if (videoState.state == PlayState.PLAYING) {
            player.playVideo()
          } else {
            player.pauseVideo()
          }
          resolve()
        })
      })
    }
  )
  emit('frameMounted')
}

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

function onPlayerStateChange(event) {
  switch (event.data) {
    case window.YT.PlayerState.PLAYING:
      if (commUtils.prevStableState == PlayState.PAUSED) {
        commUtils.prevStableState = PlayState.PLAYING

        stateChangeActionBySource(() => {
          commUtils.frontendChange = true
          event.target.pauseVideo()
          videoController.value.playVideo(event.target.getCurrentTime())
        })
      }
      break

    case window.YT.PlayerState.PAUSED:
      if (commUtils.prevStableState == PlayState.PLAYING || commUtils.alreadyPaused) {
        commUtils.alreadyPaused = false
        commUtils.prevStableState = PlayState.PAUSED

        stateChangeActionBySource(() => {
          commUtils.alreadyPaused = true
          videoController.value.stopVideo(event.target.getCurrentTime())
          event.target.playVideo()
        })
      }
      break
    default:
      break
  }
}

onMounted(() => {
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = registerVideoHandlers
  } else {
    registerVideoHandlers()
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
