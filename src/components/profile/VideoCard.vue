<template>
  <div class="card video-card mb-3" style="width: 18rem">
    <img :src="thumbnail" class="card-img-top" :alt="title" />
    <div class="card-body">
      <h5 class="card-title">
        <a :href="link"> {{ title }}</a>
      </h5>
      <p class="card-text">
        <span class="badge bg-secondary">{{ duration }}</span>
      </p>
      <p class="card-text">
        <small class="text-muted">{{ viewCount }} views</small>
        <br />
        <small class="text-muted">{{ likeCount }} likes</small>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file VideoCard.vue
 * @module VideoCard
 * Video card component.
 */
const props = defineProps<{
  /**
   * The unique identifier of the video from YouTube.
   */
  id: string
  /**
   * The title of the video.
   */
  title: string
  /**
   * The thumbnail of the video.
   */
  thumbnail: string
  /**
   * The duration of the video.
   */
  duration: string
  /**
   * The view count of the video.
   */
  viewCount: string
  /**
   * The like count of the video.
   */
  likeCount: string
}>()
const link = `https://www.youtube.com/watch?v=${props.id}`
</script>

<style scoped>
.video-card img {
  height: 180px;
  object-fit: cover;
}
.video-card {
  height: 350px;
  .card-title {
    height: 50px;
    overflow-y: hidden;
  }
}
</style>
