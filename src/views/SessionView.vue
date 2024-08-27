<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/chat/SessionFrame.vue'
</script>

<template>
  <div class="row h-100 py-5">
    <div class="col-md-8 col-12 py-5">
      <SessionFrame />
    </div>
    <div class="col-md-4 col-12 d-flex align-items-end py-5">
      <SessionChat :roomName="`myRoom`" :chatUrl="`http://localhost:3000`" />
    </div>
  </div>
</template>
