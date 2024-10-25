<template>
  <div class="d-flex flex-column min-vh-100">
    <router-view />
    <FooterComponent />
  </div>
</template>

<script setup>
/**
 * @file AuthLayout.vue
 * @module AuthLayout
 * Authentication layout component.
 */
import FooterComponent from '@/components/common/FooterComponent.vue'
</script>
