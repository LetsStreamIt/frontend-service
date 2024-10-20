<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="row collapse justify-content-end mx-0" id="navbarToggleExternalContent">
    <div class="col-5">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item nav-item-collapse px-2 active">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink to="/" class="nav-link">Profile</RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink to="/Login" class="nav-link">Login</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.nav-item-collapse:hover {
  border-radius: 8px;
  background-color: #23262d;
}
</style>
