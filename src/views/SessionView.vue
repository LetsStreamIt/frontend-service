<script setup>
import Chat from '@/components/session/SessionChat.vue'
import SessionFrame from '../components/session/SessionFrame.vue'
</script>

<template>
  <div class="row py-5">
    <div class="col-md-8 col-12 py-3">
      <SessionFrame />
    </div>
    <div class="col-md-4 col-12 d-flex flex-column py-3">
      <div class="content flex-grow-1" />
      <Chat />
    </div>
  </div>
</template>
