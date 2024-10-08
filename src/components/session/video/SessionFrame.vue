<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
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
const isProgrammaticChange = ref<boolean>(false)

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
      console.log('seeking')
      isProgrammaticChange.value = true
      videoState.state == PlayState.PLAYING ? player.value.playVideo() : player.value.pauseVideo()
      isProgrammaticChange.value = true
      player.value.seekTo(videoState.timestamp, false)
    }
  )
  emit('frameMounted')
}

function onPlayerStateChange(event) {
  console.log('event', event)
  switch (event.data) {
    case PlayerState.PLAYING:
      if (isProgrammaticChange.value) {
        isProgrammaticChange.value = false
      } else {
        console.log('SENDING PLAY')
        videoController.value.playVideo(player.value.getCurrentTime())
        isProgrammaticChange.value = true
        player.value.pauseVideo()
      }
      break
    case PlayerState.PAUSED:
      if (isProgrammaticChange.value) {
        isProgrammaticChange.value = false
      } else {
        console.log('SENDING STOP')
        videoController.value.stopVideo(player.value.getCurrentTime())
        isProgrammaticChange.value = true
        player.value.playVideo()
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
