<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/video/SessionFrame.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../controllers/session/sessionController'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionServiceUrl = ref('http://localhost:3000')

const connected = ref(false)
const connectionErrorMessage = ref('')

const isChatMounted = ref(false)
const isFrameMounted = ref(false)

function chatMounted() {
  isChatMounted.value = true
  if (isFrameMounted.value) {
    joinRoom()
  }
}

function frameMounted() {
  isFrameMounted.value = true
  if (isChatMounted.value) {
    joinRoom()
  }
}

function setErrorMessage(error) {
  switch (error) {
    case ConnectionStatus.CONNECTION_ERROR:
      connectionErrorMessage.value =
        'Unable to connect to the Session Service. Please try again later.'
      break
    case ConnectionStatus.JOIN_ERROR:
      connectionErrorMessage.value =
        'Unable to Join. Your account is already connected to another Session.'
      break
    case ConnectionStatus.INVALID_TOKEN:
      connectionErrorMessage.value = 'Unable to Join. Invalid token provided.'
      break
  }
}

function connectToSession() {
  sessionController
    .connectToSession()
    .then(() => {
      connected.value = true
    })
    .catch((error) => {
      setErrorMessage(error)
      connected.value = false
    })
}

function joinRoom() {
  sessionController
    .joinRoom(route.params.sessionId)
    .then(() => {
      connected.value = true
    })
    .catch((error) => {
      setErrorMessage(error)
      connected.value = false
    })
}

const sessionController: SessionController = new SessionControllerImpl(
  sessionServiceUrl.value,
  'token'
)

onMounted(() => {
  connectToSession()
})

onUnmounted(async () => {
  await sessionController.disconnectFromSession()
})
</script>

<template>
  <div v-if="connected" class="row h-100 py-5">
    <div class="col-md-8 col-12 py-5">
      <SessionFrame
        :videoController="sessionController.getVideoController"
        @frameMounted="frameMounted"
      />
    </div>
    <div class="col-md-4 col-12 d-flex align-items-end py-5">
      <SessionChat
        :chatController="sessionController.getChatController"
        @chatMounted="chatMounted"
      />
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 py-5">
    <p>{{ connectionErrorMessage }}</p>
  </div>
</template>
