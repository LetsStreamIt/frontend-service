<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue'
import { PlayerState } from './PlayerState.ts'
import { VideoController } from '../../../controllers/session/videoController.ts'
import { PlayState, VideoState } from '../model/video.ts'

const props = defineProps<{
  videoController: VideoController
}>()

const emit = defineEmits<{
  frameMounted: []
}>()

const { videoController } = toRefs(props)
const player = ref<YT.Player | null>(null)

const commUtils = reactive({
  backendChange: false,
  frontendChange: false,
  alreadyPaused: false,
  prevStableState: PlayState.PAUSED
})

function initializePlayer() {
  player.value = new YT.Player('player', {
    videoId: 'M7lc1UVf-VE',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  })
}

function onPlayerReady(event) {
  videoController.value.listenToVideoEvents(
    () => {
      const state: PlayState =
        player.value.getPlayerState() == PlayerState.PLAYING ? PlayState.PLAYING : PlayState.PAUSED
      return { state: state, timestamp: player.value.getCurrentTime() }
    },
    (videoState: VideoState) => {
      player.value.seekTo(videoState.timestamp, true)
      commUtils.backendChange = true
      videoState.state == PlayState.PLAYING ? player.value.playVideo() : player.value.pauseVideo()
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
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = initializePlayer
  } else {
    initializePlayer()
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
