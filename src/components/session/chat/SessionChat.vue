<script setup lang="ts">
import { ref, toRefs, onMounted } from 'vue'
import { ChatController } from '@/controllers/session/chatController'
import TextMessageComponent from './message/TextMessageComponent.vue'
import NotificationMessageComponent from './message/NotificationMessageComponent.vue'
import { Message, MessageContent } from '@/model/message'
import { MessageType } from '../../../model/message'

const props = defineProps<{
  chatController: ChatController
}>()

const { chatController } = toRefs(props)

const emit = defineEmits<{
  chatMounted: []
}>()
// Style attributes
const chatStyleAttr = ref({
  isChatHidden: false,
  toggleChatChar: '▼'
})

// Variables used to manage chat contents
const chatContent = ref({
  inputMessage: '',
  chatMessages: [] as Message<MessageContent>[]
})

function toggleChat() {
  chatStyleAttr.value.isChatHidden = !chatStyleAttr.value.isChatHidden
  chatStyleAttr.value.toggleChatChar = chatStyleAttr.value.toggleChatChar === '▼' ? '▲' : '▼'
}

function sendMessage() {
  if (chatContent.value.inputMessage !== '') {
    chatController.value.sendMessage(chatContent.value.inputMessage)
    chatContent.value.inputMessage = ''
  }
}

function recvMessageCallback(message: Message<MessageContent>) {
  chatContent.value.chatMessages.push(message)
}

onMounted(async () => {
  // Connect to the chat whenever is mounted
  await chatController.value.handleChatMessages(recvMessageCallback)
  emit('chatMounted')
})
</script>

<template>
  <div class="w-100">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom-0"
      style="border-radius: 15px 15px 0 0"
    >
      <i class="fas fa-angle-left"></i>
      <p class="mb-0 fw-bold">Live chat</p>
      <button @click="toggleChat" type="button" class="btn text-white fw-bold fs-5">
        {{ chatStyleAttr.toggleChatChar }}
      </button>
    </div>

    <div
      v-if="chatStyleAttr.isChatHidden && chatContent.chatMessages.length > 0"
      class="card"
      style="overflow-y: scroll; max-height: 500px"
    >
      <div v-for="(message, index) in chatContent.chatMessages" :key="index">
        <NotificationMessageComponent
          v-if="message.type === MessageType.NOTIFICATION_MSG"
          :message="message"
        />
        <TextMessageComponent v-if="message.type === MessageType.TEXT_MSG" :message="message" />
      </div>
    </div>
    <form @submit.prevent="sendMessage" class="form-group">
      <input type="text" class="w-100" v-model="chatContent.inputMessage" placeholder="Message" />
      <button type="submit" class="btn btn-primary w-100" style="border-radius: 0 0 10px 10px">
        Send Message
      </button>
    </form>
  </div>
</template>
