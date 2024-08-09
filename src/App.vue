<script setup>
import NavbarComponent from './components/common/NavbarComponent.vue'
import Footer from './components/common/AppFooter.vue'
</script>

<template>
  <div class="container-fluid" style="height: 100vh">
    <div class="container-fluid" style="height: 10%">
      <NavbarComponent />
    </div>

    <div class="container-fluid" style="height: 70vh">
      <RouterView />
    </div>

    <Footer style="height: 15%"></Footer>
  </div>
</template>

<style></style>
