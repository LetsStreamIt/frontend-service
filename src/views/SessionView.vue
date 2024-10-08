<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/video/SessionFrame.vue'
import { ref, toRefs, onMounted, onUnmounted, watch } from 'vue'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../controllers/session/sessionController'

// const props = defineProps({
//   chatUrl: {
//     type: String,
//     required: true
//   },
//   roomName: {
//     type: String,
//     required: true
//   }
// })

// const { chatUrl, roomName } = toRefs(props)

const chatData = ref({
  chatUrl: 'http://localhost:3000',
  roomName: 'room'
})

const { chatUrl, roomName } = chatData.value

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
  // Connect to the chat whenever is mounted
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
  // Connect to the chat whenever is mounted
  sessionController
    .joinRoom()
    .then(() => {
      console.log('JOIN ROOM')
      connected.value = true
    })
    .catch((error) => {
      setErrorMessage(error)
      connected.value = false
    })
}

const sessionController: SessionController = new SessionControllerImpl(chatUrl, 'token', roomName)

onMounted(() => {
  connectToSession()
  console.log('SESSION MOUNTED')
})

onUnmounted(async () => {
  await sessionController.disconnectFromSession()
})

// watch([frameMounted, chatMounted], ([frameMountedValue, chatMountedValue]) => {
//   console.log("oooooo", frameMountedValue, chatMountedValue)
//   if (frameMountedValue && chatMountedValue) {
//     // Both components are mounted; execute your action here
//     console.log('Both SessionFrame and SessionChat are mounted');
//     // Call any other actions or methods here
//   }
// });
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
