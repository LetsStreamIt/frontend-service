<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/video/SessionFrame.vue'
import { ref, toRefs, onMounted, onUnmounted } from 'vue'
import { SessionController, SessionControllerImpl } from '../controllers/session/sessionController'

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
const sessionController: SessionController = new SessionControllerImpl(chatUrl, 'token', roomName)

onMounted(async () => {
  // Connect to the chat whenever is mounted
  try {
    await sessionController.connectToSession()
    connected.value = true
  } catch (error) {
    connected.value = false
  }
})

onUnmounted(async () => {
  await sessionController.disconnectFromSession()
})
</script>

<template>
  <div v-if="connected" class="row h-100 py-5">
    <div class="col-md-8 col-12 py-5">
      <SessionFrame />
    </div>
    <div class="col-md-4 col-12 d-flex align-items-end py-5">
      <SessionChat :chatController="sessionController.getChatController" />
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 py-5">
    <!-- Show this if not connected -->
    <p>Unable to connect to the chat. Please try again later.</p>
  </div>
</template>
