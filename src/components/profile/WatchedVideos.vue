<script setup lang="ts">
/**
 * @file WatchedVideos.vue
 * @module WatchedVideos
 * Watched videos component.
 */
import { ref, watch } from 'vue'
import { ProfileVideo } from '@/model/video'
import { getVideoInfo } from '@/controllers/profile/youtubeController'
import VideoCarousel from '@/components/profile/VideoCarousel.vue'

const props = defineProps<{
  /**
   * The list of videos watched by the user.
   */
  videos: string[]
}>()

const profileVideos = ref<ProfileVideo[]>([])

/**
 * Fetches the video information from YouTube.
 */
watch(
  () => props.videos,
  () => {
    let videosPromises: Promise<ProfileVideo | null>[] = []
    props.videos.forEach((videoId) => {
      videosPromises.push(getVideoInfo(videoId))
    })
    Promise.all(videosPromises).then((values) => {
      profileVideos.value = values.filter((value) => value !== null)
    })
  }
)
</script>

<template>
  <div class="video-stats">
    <div v-if="profileVideos.length !== 0">
      <h2>Watched Videos</h2>
      <VideoCarousel :videos="profileVideos" />
    </div>
  </div>
</template>
