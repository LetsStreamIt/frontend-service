<script>
import SessionNavbar from '@/components/common/session/SessionNavbar.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'

export default {
  components: {
    SessionNavbar,
    FooterComponent
  }
}
</script>

<template>
  <div class="row">
    <SessionNavbar />
  </div>
  <div class="row vh-100">
    <router-view />
  </div>
  <div class="row">
    <FooterComponent />
  </div>
</template>

<style></style>
