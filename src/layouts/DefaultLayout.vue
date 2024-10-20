<script>
import DefaultHeader from '@/components/common/default/DefaultHeader.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'

export default {
  components: {
    DefaultHeader,
    FooterComponent
  }
}
</script>

<template>
  <div class="container-fluid background-container h-100 w-100">
    <div class="cover-container d-flex h-100 w-75 p-3 mx-auto flex-column">
      <DefaultHeader />
      <router-view />
      <FooterComponent />
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
  background-color: #2f333c;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
}

.cover-container {
  background-color: #2f333c;
}

.background-container {
  background-image: url('../assets/film-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
