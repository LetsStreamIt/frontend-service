<script setup>
import SessionFrame from '../components/session/SessionFrame.vue'
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 bg-primary">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/JQHZ1hS__Bk?si=rQ7hk3BfdCw12tPJ"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </div>
      <div class="col-md-3 bg-secondary">
        <div class="chat-box">
          <div class="chat-input">
            <input type="text" class="form-control" placeholder="Type your message...">
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>