<script setup>
import Chat from '@/components/session/SessionChat.vue'
import SessionFrame from '../components/session/SessionFrame.vue'
</script>

<template>
  <div class="row h-100">
    <div class="col-md-8">
      <SessionFrame />
    </div>
    <div class="col-md-4 d-flex flex-column">
      <div class="content flex-grow-1" />
      <Chat />
    </div>
  </div>
</template>
