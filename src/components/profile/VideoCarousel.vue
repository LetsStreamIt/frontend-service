<template>
  <div class="video-list-container">
    <div class="video-list">
      <div class="video-item" v-for="(video, index) in props.videos" :key="index">
        <VideoCard
          :id="video.id"
          :title="video.title"
          :thumbnail="video.thumbnail"
          :duration="video.duration"
          :viewCount="video.viewCount"
          :likeCount="video.likeCount"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoCard from '@/components/profile/VideoCard.vue'
import { ProfileVideo } from '@/model/video'

const props = defineProps<{
  videos: ProfileVideo[]
}>()
</script>

<style scoped>
.video-list-container {
  overflow-x: auto; /* Enables horizontal scrolling */
  padding: 10px;
}

.video-list {
  display: flex;
  gap: 10px; /* Space between video cards */
  flex-wrap: nowrap; /* Prevents wrapping, ensures horizontal scrolling */
}

.video-item {
  flex: 0 0 auto; /* Each item takes its natural width */
  width: 18rem; /* Same width as the card size */
}
</style>
