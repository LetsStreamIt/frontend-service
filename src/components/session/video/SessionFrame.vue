<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PlayerState } from './PlayerState.ts'

const player = ref<YT.Player | null>(null)

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
  console.log('YouTube Player is ready.', event)
}

function onPlayerStateChange(event) {
  switch (event.data) {
    case PlayerState.PLAYING:
      console.log('Playing', player.value.getCurrentTime())
      break
    case PlayerState.PAUSED:
      console.log('Paused', player.value.getCurrentTime())
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
