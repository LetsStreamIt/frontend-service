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
const msgClass = ref<string>(
  'd-flex flex-row justify-content-start m-1 text-white '.concat(
    isJoined ? 'bg-success' : 'bg-danger'
  )
)
</script>
textColor
<template>
  <div style="border-radius: 15px" :class="msgClass">
    <p class="p-2 w-100 small mb-0 fst-italic">
      {{ message.getSender.value.getX }} {{ message.getSender.value.getY }} {{ msgBody }}
    </p>
  </div>
</template>
