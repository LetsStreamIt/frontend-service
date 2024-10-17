<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { PlayerState } from './PlayerState.ts'
import { VideoController } from '../../../controllers/session/videoController.ts'
import { PlayState, VideoState } from '../model/video.ts'

const props = defineProps<{
  videoController: VideoController
  videoId: string
}>()

const emit = defineEmits<{
  frameMounted: []
}>()

const { videoController, videoId } = toRefs(props)
const player = ref<YT.Player | null>(null)
const videoActions = ref<((player: YT.Player) => void)[]>([])

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

function initializePlayer() {
  new YT.Player('player', {
    videoId: videoId.value,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

function handleVideoNotifications() {
  videoActions.value.forEach((callback: (player: YT.Player) => void) => {
    if (player.value) {
      callback(player.value)
    }
  })
}

function onPlayerReady(event) {
  player.value = event.target

  handleVideoNotifications()
  watch(
    () => videoActions.value,
    (notifications) => {
      if (notifications.length > 0) {
        handleVideoNotifications()
      }
    },
    { deep: true }
  )
}

function registerVideoHandlers() {
  videoController.value.handleVideoNotifications(
    () => {
      return new Promise((resolve) => {
        videoActions.value.push((player: YT.Player) => {
          const state: PlayState =
            player.getPlayerState() == YT.PlayerState.PLAYING ? PlayState.PLAYING : PlayState.PAUSED
          resolve({ state: state, timestamp: player.getCurrentTime() })
        })
      })
    },

    (videoState: VideoState) => {
      return new Promise((resolve) => {
        videoActions.value.push((player: YT.Player) => {
          player.seekTo(videoState.timestamp, true)
          commUtils.backendChange = true
          videoState.state == PlayState.PLAYING ? player.playVideo() : player.pauseVideo()
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
    case PlayerState.PLAYING:
      if (commUtils.prevStableState == PlayState.PAUSED) {
        commUtils.prevStableState = PlayState.PLAYING

        stateChangeActionBySource(() => {
          commUtils.frontendChange = true
          event.target.pauseVideo()
          videoController.value.playVideo(event.target.getCurrentTime())
        })
      }
      break

    case PlayerState.PAUSED:
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
