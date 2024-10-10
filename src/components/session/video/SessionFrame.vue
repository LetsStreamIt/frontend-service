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
const backendChange = ref<boolean>(false)
const frontendChange = ref<boolean>(false)
const flag = ref<boolean>(false)

const prevStableState = ref<PlayState>(PlayState.PAUSED)

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
      console.log('SEEKING', videoState.timestamp, videoState.state)
      player.value.seekTo(videoState.timestamp, true)
      backendChange.value = true
      videoState.state == PlayState.PLAYING ? player.value.playVideo() : player.value.pauseVideo()
    }
  )
  emit('frameMounted')
}

function playVideoo(event) {
  event.target.playVideo()
}

function onPlayerStateChange(event) {
  //console.log(event.target)
  console.log(
    'event',
    event,
    backendChange.value,
    frontendChange.value,
    //player.value.getCurrentTime(),
    prevStableState.value
  )
  switch (event.data) {
    case PlayerState.PLAYING:
      if (prevStableState.value == PlayState.PAUSED) {
        prevStableState.value = PlayState.PLAYING

        if (backendChange.value) {
          console.log('PLAYING: API back CHANGE')
          backendChange.value = false
        } else {
          if (frontendChange.value) {
            console.log('PLAYING: API frond CHANGE')
            frontendChange.value = false
          } else {
            console.log('PLAYING: USER CHANGE')
            frontendChange.value = true
            event.target.pauseVideo()
            videoController.value.playVideo(event.target.getCurrentTime())
          }
        }
      }

      break

    case PlayerState.PAUSED:
      if (prevStableState.value == PlayState.PLAYING || flag.value) {
        flag.value = false
        prevStableState.value = PlayState.PAUSED
        if (backendChange.value) {
          console.log('PAUSED: API back CHANGE')
          backendChange.value = false
        } else {
          if (frontendChange.value) {
            console.log('PAUSED: API front CHANGE')
            frontendChange.value = false
          } else {
            console.log('PAUSED: USER CHANGE')
            flag.value = true
            videoController.value.stopVideo(event.target.getCurrentTime())
            event.target.playVideo()
            // setTimeout(() => videoController.value.stopVideo(player.value.getCurrentTime()), 1000)
          }
        }
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
