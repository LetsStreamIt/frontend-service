<script setup lang="ts">
import { ref, toRefs, onMounted, onUnmounted, computed } from 'vue'
import { ChatController } from '../../../controllers/session/chat/chatController'
import { Message, MessageContent } from '../model/message'
import TextMessageComponent from './message/TextMessageComponent.vue'
import NotificationMessageComponent from './message/NotificationMessageComponent.vue'
import { ChatControllerImpl } from '../../../controllers/session/chat/chatControllerImpl'

const props = defineProps({
  chatUrl: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    required: true
  }
})

const { chatUrl, roomName } = toRefs(props)

// Style attributes
const chatStyleAttr = ref({
  isChatHidden: false,
  toggleChatChar: '▼'
})

// Variables used to manage chat contents
const chatContent = ref({
  inputMessage: '',
  chatMessages: [] as any[],
  chatController: new ChatControllerImpl(chatUrl.value, 'token', roomName.value) as ChatController
})

const cardClass = computed(() => {
  return {
    'overflow-scroll': true,
    card: true,
    'd-none': chatStyleAttr.value.isChatHidden
  }
})

function toggleChat() {
  chatStyleAttr.value.isChatHidden = !chatStyleAttr.value.isChatHidden
  chatStyleAttr.value.toggleChatChar = chatStyleAttr.value.toggleChatChar === '▼' ? '▲' : '▼'
}

function sendMessage() {
  if (chatContent.value.inputMessage !== '') {
    chatContent.value.chatController.sendMessage(chatContent.value.inputMessage)
    chatContent.value.inputMessage = ''
  }
}

function recvMessageCallback(message: Message<MessageContent>) {
  chatContent.value.chatMessages.push(message)
}

onMounted(async () => {
  // Connect to the chat whenever is mounted
  await chatContent.value.chatController.connectToChat(recvMessageCallback)
})

onUnmounted(async () => {
  await chatContent.value.chatController.disconnectToChat()
})
</script>

<template>
  <div class="w-100" style="border-radius: 15px">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom-0"
      style="border-top-left-radius: 15px; border-top-right-radius: 15px"
    >
      <i class="fas fa-angle-left"></i>
      <p class="mb-0 fw-bold">Live chat</p>
      <button @click="toggleChat" type="button" class="btn text-white fw-bold fs-5">
        {{ chatStyleAttr.toggleChatChar }}
      </button>
    </div>

    <div :class="cardClass" style="max-height: 500px">
      <div v-for="(message, index) in chatContent.chatMessages" :key="index">
        <NotificationMessageComponent
          v-if="message.type === 'notificationMessage'"
          :message="message"
        />
        <TextMessageComponent v-if="message.type === 'textMessage'" :message="message" />
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="form-group">
      <input type="text" class="w-100" v-model="chatContent.inputMessage" placeholder="Message" />
      <button type="submit" class="btn btn-primary w-100">Send Message</button>
    </form>
  </div>
</template>
