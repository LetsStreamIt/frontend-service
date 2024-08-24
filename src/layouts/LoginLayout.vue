<template>
  <router-view />
  <FooterComponent />
</template>

<script setup>
import FooterComponent from '@/components/common/FooterComponent.vue'
</script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 20px;
}

header,
footer {
  text-align: center;
  margin-bottom: 20px;
}

main {
  width: 100%;
  max-width: 400px;
}
</style>
