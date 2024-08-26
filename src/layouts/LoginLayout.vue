<template>
  <div class="d-flex flex-column min-vh-100">
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from '@/components/common/FooterComponent.vue'
</script>
