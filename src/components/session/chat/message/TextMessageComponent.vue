<script setup lang="ts">
import { toRefs } from 'vue'
import { TextMessage } from '@/model/message'

const props = defineProps({
  message: {
    type: TextMessage,
    required: true
  }
})

const { message } = toRefs(props)
</script>

<template>
  <div class="d-flex flex-row justify-content-start m-1">
    <div class="p-2" style="border-radius: 15px; background-color: rgba(57, 192, 237, 0.2)">
      <p class="small mb-0">
        {{ message.getSender.value.getX }} {{ message.getSender.value.getY }}:
        {{ message.getContent }}
      </p>
    </div>
  </div>
</template>
