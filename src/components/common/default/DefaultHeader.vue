<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand">LetsStreamIt</h3>
      <nav class="nav nav-masthead justify-content-center">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/" class="nav-link">Profile</RouterLink>
        <RouterLink to="/session" class="nav-link">Session</RouterLink>
      </nav>
    </div>
  </header>
</template>
