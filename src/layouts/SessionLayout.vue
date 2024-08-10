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
  <SessionNavbar />
  <router-view />
  <div class="row">
    <FooterComponent />
  </div>
</template>

<style></style>
