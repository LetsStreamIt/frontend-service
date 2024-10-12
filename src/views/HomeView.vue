<script setup>
import { ref, onMounted } from 'vue'
import CreateSessionPopup from '../components/session/CreateSessionPopup.vue'

const createSessionModal = ref(null)

function showCreateSessionPopup() {
  if (createSessionModal.value) {
    createSessionModal.value.show()
  }
}

function hideCreateSessionPopup() {
  if (createSessionModal.value) {
    createSessionModal.value.hide()
  }
}

onMounted(() => {
  createSessionModal.value = new bootstrap.Modal('#createSessionPopup')
  createSessionModal.value.hide()
})
</script>

<template>
  <CreateSessionPopup @createSession="hideCreateSessionPopup"></CreateSessionPopup>

  <div class="cover-container d-flex p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">Welcome to Let's Stream It!</h1>
      <p class="lead">
        Create or Join a Youtube session and enjoy it with your friends around the globe!
      </p>
      <div class="container-fluid">
        <div class="row">
          <a
            href="#"
            class="btn btn-lg btn-secondary"
            style="width: 100%"
            @click="showCreateSessionPopup"
            >Create a Streaming Session</a
          >
        </div>
      </div>
      <p class="lead"></p>
    </main>
  </div>
</template>
