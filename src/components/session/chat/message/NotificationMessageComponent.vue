<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { NotificationMessage, Notification } from '../../model/message'

const props = defineProps({
  message: {
    type: NotificationMessage,
    required: true
  }
})

const { message } = toRefs(props)

const isJoined = message.value.content == Notification.JOINROOM

const msgBody = ref<string>(isJoined ? 'Joined the room' : 'Left the room')
const textClass = ref<string>(
  'small mb-0 fst-italic '.concat(isJoined ? 'text-success' : 'text-danger')
)
</script>
textColor
<template>
  <div class="d-flex flex-row justify-content-start mb-4">
    <img
      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
      alt="avatar 1"
      style="width: 45px; height: 100%"
    />
    <div class="py-3 ms-3">
      <p :class="textClass">
        {{ message.getSender.value.getX }} {{ message.getSender.value.getY }}:
        {{ msgBody }}
      </p>
    </div>
  </div>
</template>
