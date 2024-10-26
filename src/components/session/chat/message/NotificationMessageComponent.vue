<script setup lang="ts">
/**
 * @file NotificationMessageComponent.vue
 * @module NotificationMessageComponent
 * Notification Message Component
 */
import { ref, toRefs } from 'vue'
import { NotificationMessage, JoinNotification } from '@/model/session/message/chatMessage'

const props = defineProps({
  /**
   * The notification message
   */
  message: {
    type: NotificationMessage,
    required: true
  }
})

const { message } = toRefs(props)
const isJoined = message.value.content == JoinNotification.JOINROOM

const messageBody = ref<string>(isJoined ? 'Joined the room' : 'Left the room')
const messageClass = ref<string>(
  'd-flex flex-row justify-content-start m-1 text-white '.concat(
    isJoined ? 'bg-success' : 'bg-danger'
  )
)
</script>

<template>
  <div style="border-radius: 15px" :class="messageClass">
    <p class="p-2 w-100 small mb-0 fst-italic">
      <span class="fw-bolder"> {{ message.getSender.value }} </span> {{ messageBody }}
    </p>
  </div>
</template>
