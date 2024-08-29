<script setup lang="ts">
import { usePlayer, PlayerState } from '@vue-youtube/core'
import { ref } from 'vue'

const player = ref()

const { onReady, onStateChange, instance } = usePlayer('dQw4w9WgXcQ', player, {
  playerVars: {
    autoplay: 1,
    mute: 1
  }
})

onReady((event) => {
  // Send Message to Session Service to get the current timestamp
  console.log('ready', event)
})

onStateChange((event) => {
  switch (event.data) {
    case PlayerState.PLAYING:
      // Send Message to Session Service to Play the video from the current timestamp
      console.log('Playing from', instance.value?.getCurrentTime())
      break
    case PlayerState.PAUSED:
      // Send Message to Session Service to Stop the video
      console.log('Paused at', instance.value?.getCurrentTime())
      break
    default:
      break
  }
})
</script>

<template>
  <div class="responsive-iframe" ref="player" />
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
