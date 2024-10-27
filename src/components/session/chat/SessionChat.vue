<script setup lang="ts">
/**
 * @file SessionChat.vue
 * @module SessionChat
 * Session Chat
 */
import { ref, toRefs, onMounted } from 'vue'
import { type IChatController } from '@/controllers/session/chatController'
import TextMessageComponent from './message/TextMessageComponent.vue'
import NotificationMessageComponent from './message/NotificationMessageComponent.vue'
import type {
  ChatMessageType,
  ChatMessage,
  MessageContent
} from '@/model/session/message/chatMessage'

const props = defineProps<{
  /**
   * Chat controller used to send/recv messages.
   */
  chatController: IChatController
}>()

const { chatController } = toRefs(props)

const emit = defineEmits<{
  /**
   * Message to emit when the chat is ready to send/recv messages.
   */
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
  chatMessages: [] as ChatMessage<MessageContent>[]
})

/**
 * Show/Hide the messages when the arrow is toggled
 */
function toggleChat() {
  chatStyleAttr.value.isChatHidden = !chatStyleAttr.value.isChatHidden
  chatStyleAttr.value.toggleChatChar = chatStyleAttr.value.toggleChatChar === '▼' ? '▲' : '▼'
}

/**
 * Send a message to the Session by leveraging the Chat Controller
 */
function sendMessage() {
  if (chatContent.value.inputMessage !== '') {
    chatController.value.sendMessage(chatContent.value.inputMessage)
    chatContent.value.inputMessage = ''
  }
}

/**
 * Callback to execute whenever Chat Controller receives a message
 * @param message
 */
function chatMessageReceivedCallback(message: ChatMessage<MessageContent>) {
  chatContent.value.chatMessages.push(message)
}

/**
 * Emit 'chatMounted' whenever the component is ready to receive messages
 */
onMounted(() => {
  chatController.value.handleChatMessages(chatMessageReceivedCallback)
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
          v-if="message.type === ChatMessageType.NOTIFICATION_MESSAGE"
          :message="message"
        />
        <TextMessageComponent
          v-if="message.type === ChatMessageType.TEXT_MESSAGE"
          :message="message"
        />
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
