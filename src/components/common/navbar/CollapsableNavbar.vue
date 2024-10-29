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
    authStore.logout()
    isLoggedIn.value = await authStore.isLoggedIn()
    router.push('/')
  }
}
</script>

<template>
  <div class="row collapse justify-content-end mx-0" id="navbarToggleExternalContent">
    <div class="col-5">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item nav-item-collapse px-2 active">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink :to="`/profile/${authStore.email || 'not-logged'}`" class="nav-link"
            >Profile</RouterLink
          >
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </li>
        <div v-if="!isLoggedIn">
          <li class="nav-item nav-item-collapse px-2">
            <RouterLink to="/Login" class="nav-link">Login</RouterLink>
          </li>
        </div>
        <div v-else>
          <li class="nav-item nav-item-collapse px-2">
            <button @click="logout" class="nav-link">Logout</button>
          </li>
        </div>
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
