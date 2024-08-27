<script setup lang="ts">
import { toRefs } from 'vue'
import { NotificationMessage, Notification } from './model/message'

const props = defineProps({
  message: {
    type: NotificationMessage,
    required: true
  }
})

const { message } = toRefs(props)

function messageBody(notification: Notification): string {
  return notification == Notification.JOINROOM ? 'Joined the room' : 'Left the room'
}
</script>

<template>
  <div class="d-flex flex-row justify-content-start mb-4">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1"
      style="width: 45px; height: 100%"
    />
    <div class="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)">
      <p class="small mb-0">
        {{ message.getSender.value.getX }} {{ message.getSender.value.getY }}:
        {{ messageBody(message.getContent) }}
      </p>
    </div>
  </div>
</template>
