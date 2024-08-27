<script setup lang="ts">
import { ref, toRefs, onMounted, Ref } from 'vue'
import { ChatController, ChatControllerImpl } from '../../controllers/chatController/chatController'
import { NotificationMessage, TextMessage } from './model/message'
import TextMessageComponent from './TextMessageComponent.vue'
import NotificationMessageComponent from './NotificationMessageComponent.vue'

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

const isChatHidden: Ref<boolean> = ref(false)
const inputMessage: Ref<string> = ref('')
const chatMessages: Ref<any[]> = ref([])
const toggleChatChar: Ref<string> = ref('▼')
const chatController: Ref<ChatController> = ref(
  new ChatControllerImpl(chatUrl.value, 'token1', roomName.value)
)

function toggleChat() {
  isChatHidden.value = !isChatHidden.value
  toggleChatChar.value = isChatHidden.value ? '▲' : '▼'
}

function sendMessage() {
  chatController.value.sendMessage(inputMessage.value)
  inputMessage.value = ''
}

const cardClass = ref({
  'overflow-scroll': true,
  card: true,
  'd-none': isChatHidden
})

function messageCallback(message: TextMessage) {
  console.log('message', message)
  chatMessages.value.push(message)
}

function notificationCallback(message: NotificationMessage) {
  chatMessages.value.push(message)
}

onMounted(async () => {
  await chatController.value.connectToChat(messageCallback, notificationCallback)
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
        {{ toggleChatChar }}
      </button>
    </div>

    <div :class="cardClass" style="max-height: 500px">
      <!-- <h1>{{ chatMessages }}</h1> -->
      <!-- </dynamic :template="chatMessages"></dynamic> -->
      <div v-for="(message, index) in chatMessages" :key="index">
        <NotificationMessageComponent
          v-if="message.type === 'notificationMessage'"
          :message="message"
        />
        <TextMessageComponent v-if="message.type === 'textMessage'" :message="message" />
      </div>
      <div v-html="chatMessages"></div>
      <input type="text" v-model="inputMessage" placeholder="Message" />
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>
