<script setup lang="ts">
import { ref } from 'vue'
import CreateSessionPopup from '../components/session/CreateSessionPopup.vue'
import { useAuthStore } from '../stores/auth.ts'
import { useRouter } from 'vue-router'

const popupHidden = ref<boolean>(true)
const authStore = useAuthStore()
const router = useRouter()

function closePopup() {
  popupHidden.value = true
}

function showPopup() {
  authStore.isLoggedIn().then((logged: boolean) => {
    if (logged) {
      popupHidden.value = false
    } else {
      router.push('/login')
    }
  })
}
</script>

<template>
  <div v-if="!popupHidden">
    <CreateSessionPopup @closePopup="closePopup"></CreateSessionPopup>
  </div>

  <div class="row d-flex p-3 mx-auto align-items-center h-100">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">
        Welcome to <span class="fst-italic fw-bolder">Let's Stream It!</span>
      </h1>
      <p class="lead">
        Create or Join a Youtube session and enjoy it with your friends around the globe!
      </p>
      <div class="container-fluid">
        <div class="row">
          <a class="btn btn-lg fw-bolder btn-secondary" style="width: 100%" @click="showPopup"
            >Create a Streaming Session</a
          >
        </div>
      </div>
      <p class="lead"></p>
    </main>
  </div>
</template>
