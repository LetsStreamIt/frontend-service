<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const isLoggedIn = ref(false)

const router = useRouter()

// Fetch logged-in state asynchronously
onMounted(async () => {
  isLoggedIn.value = await authStore.isLoggedIn()
})

const logout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    await authStore.logout()
    isLoggedIn.value = await authStore.isLoggedIn()
    router.push('/')
  }
}
</script>

<template>
  <RouterLink to="/" class="navbar-brand">LetsStreamIt</RouterLink>

  <nav class="navbar navbar-dark">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <div class="collapse navbar-collapse justify-content-end" id="navigationNavbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink :to="`/profile/${authStore.email || 'not-logged'}`" class="nav-link"
          >Profile</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </li>
      <div v-if="!isLoggedIn">
        <li class="nav-item">
          <RouterLink to="/Login" class="nav-link">Login</RouterLink>
        </li>
      </div>
      <div v-else>
        <li class="nav-item">
          <button @click="logout" class="nav-link">Logout</button>
        </li>
      </div>
    </ul>
  </div>
</template>
