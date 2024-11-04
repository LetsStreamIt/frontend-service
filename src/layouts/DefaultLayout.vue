<script>
import DefaultNavbar from '@/components/common/navbar/DefaultNavbar.vue'
import FooterComponent from '@/components/common/FooterComponent.vue'

export default {
  components: {
    DefaultNavbar,
    FooterComponent
  }
}
</script>

<template>
  <div class="container-fluid background-container">
    <div class="cover-container col-md-8 col-12 px-3 mx-auto d-flex justify-content-between">
      <DefaultNavbar />
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
  min-height: 100vh;
  flex-direction: column;
}

.background-container {
  @media screen and (min-width: 768px) {
    background-image: url('../assets/film-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
  min-height: 100vh;
}
</style>
