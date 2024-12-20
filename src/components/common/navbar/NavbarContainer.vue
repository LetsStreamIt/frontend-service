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
  <div class="navbar navbar-expand-md navbar-dark">
    <RouterLink to="/" class="navbar-brand align-self-start">LetsStreamIt</RouterLink>
    <ul class="navbar-nav mr-auto w-100 align-self-start justify-content-end">
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
      <li v-if="!isLoggedIn" class="nav-item">
        <RouterLink to="/Login" class="nav-link">Login</RouterLink>
      </li>
      <li v-else class="nav-item">
        <button @click="logout" class="nav-link">Logout</button>
      </li>
    </ul>
  </div>
</template>
