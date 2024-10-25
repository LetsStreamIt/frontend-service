<script setup lang="ts">
import { toRefs } from 'vue'
import { TextMessage } from '@/model/message'
import { useAuthStore } from '../../../../stores/auth'

const authStore = useAuthStore()

const props = defineProps({
  message: {
    type: TextMessage,
    required: true
  }
})

const { message } = toRefs(props)
console.log('AUTH STORE EMAIL', authStore.email)
console.log('MSG', message.value.getSender.getId.getEmail)

const contentAlignment: string =
  authStore.email === message.value.getSender.getId.getEmail
    ? ' justify-content-end'
    : ' justify-content-start'

console.log('ALIGN', message.value.getSender.getId.getEmail, contentAlignment)

const messageUsernameText: string =
  authStore.email === message.value.getSender.getId.getEmail
    ? 'Me'
    : message.value.getSender.getUsername
</script>

<template>
  <div class="d-flex flex-row m-1" :class="contentAlignment">
    <div class="p-2" style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)">
      <p class="small mb-0">
        {{ messageUsernameText }}:
        {{ message.getContent }}
      </p>
    </div>
  </div>
</template>
