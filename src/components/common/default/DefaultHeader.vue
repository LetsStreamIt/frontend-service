<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="row">
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">LetsStreamIt</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigationNavbar"
          aria-controls="navigationNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navigationNavbar">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <RouterLink to="/" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Profile</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/Login" class="nav-link">Login</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
