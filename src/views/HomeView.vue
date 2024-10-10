<script setup>
import { ref, onMounted } from 'vue'
import Popup from '../components/session/Popup.vue'

const joinSessionModal = ref(null)

function showPopup() {
  if (joinSessionModal.value) {
    joinSessionModal.value.show()
  }
}

function closePopup() {
  if (joinSessionModal.value) {
    joinSessionModal.value.hide()
  }
}

onMounted(() => {
  joinSessionModal.value = new bootstrap.Modal('#joinSessionPopup')
  joinSessionModal.value.hide()
})
</script>

<template>
  <Popup @closeJoinSessionPopup="closePopup"></Popup>
  <!-- <div id="myModal"></div> -->

  <div class="cover-container d-flex p-3 mx-auto flex-column">
    <main role="main" class="inner cover">
      <h1 class="cover-heading">Welcome to Let's Stream It!</h1>
      <p class="lead">
        Create or Join a Youtube session and enjoy it with your friends around the globe!
      </p>
      <div class="container-fluid">
        <div class="row">
          <div class="col-6">
            <a href="#" class="btn btn-lg btn-secondary" style="width: 100%">Create a Session</a>
          </div>
          <div class="col-6">
            <a href="#" class="btn btn-lg btn-secondary" style="width: 100%" @click="showPopup"
              >Join a Session</a
            >
          </div>
        </div>
      </div>
      <p class="lead"></p>
    </main>
  </div>
</template>
