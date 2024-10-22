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
const props = defineProps<{
  id: string
  title: string
  thumbnail: string
  duration: string
  viewCount: string
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
