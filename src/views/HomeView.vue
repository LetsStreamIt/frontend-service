<script setup lang="ts">
import { ref } from 'vue'
import CreateSessionPopup from '../components/session/CreateSessionPopup.vue'

const popupHidden = ref<boolean>(true)

function closePopup() {
  popupHidden.value = true
}

function showPopup() {
  popupHidden.value = false
}
</script>

<template>
  <div v-if="!popupHidden">
    <CreateSessionPopup @closePopup="closePopup"></CreateSessionPopup>
  </div>

  <div class="cover-container d-flex p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">Welcome to Let's Stream It!</h1>
      <p class="lead">
        Create or Join a Youtube session and enjoy it with your friends around the globe!
      </p>
      <div class="container-fluid">
        <div class="row">
          <a href="#" class="btn btn-lg btn-secondary" style="width: 100%" @click="showPopup"
            >Create a Streaming Session</a
          >
        </div>
      </div>
      <p class="lead"></p>
    </main>
  </div>
</template>
