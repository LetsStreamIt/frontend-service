<script>
import SessionNavbar from '@/components/session/SessionNavbar.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'

export default {
  components: {
    SessionNavbar,
    FooterComponent
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <SessionNavbar />
    </div>
    <div class="row vh-100 pb-5 ml-0">
      <router-view />
    </div>
    <div class="row">
      <FooterComponent />
    </div>
  </div>
</template>
