<script setup lang="ts">
/**
 * @file TextMessageComponent.vue
 * @module TextMessageComponent
 * Text Message Component
 */
import { toRefs } from 'vue'
import { TextMessage } from '@/model/session/message/chatMessage'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  /**
   * The text message
   */
  message: {
    type: TextMessage,
    required: true
  }
})

const { message } = toRefs(props)

const contentAlignment: string =
  authStore.email === message.value.sender.id.email
    ? ' justify-content-end'
    : ' justify-content-start'

const messageUsernameText: string =
  authStore.email === message.value.sender.id.email ? 'Me' : message.value.sender.username
</script>

<template>
  <div class="d-flex flex-row m-1" :class="contentAlignment">
    <div class="p-2" style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)">
      <p class="small mb-0">
        {{ messageUsernameText }}:
        {{ message.content }}
      </p>
    </div>
  </div>
</template>
