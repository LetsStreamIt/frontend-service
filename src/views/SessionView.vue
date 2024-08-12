<script setup>
import SessionChat from '@/components/session/SessionChat.vue'
import SessionFrame from '@/components/session/SessionFrame.vue'
</script>

<template>
  <div class="row h-100 py-5">
    <div class="col-md-8 col-12 py-5">
      <SessionFrame />
    </div>
    <div class="col-md-4 col-12 d-flex align-items-end py-5">
      <SessionChat/>
    </div>
  </div>
</template>
