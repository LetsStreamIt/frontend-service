<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const authStore = useAuthStore()

const isLoggedIn = ref(false)
const linkClass = ref('collapse')

const router = useRouter()

function toggleNavbar() {
  linkClass.value = linkClass.value != 'collapse' ? 'collapse' : ''
}

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
  <nav class="navbar navbar-dark">
    <RouterLink to="/" class="navbar-brand">LetsStreamIt</RouterLink>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      @click="toggleNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="navbar-collapse d-flex align-items-end flex-column my-2"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav w-50">
        <li class="nav-item active nav-item-collapse px-2">
          <RouterLink to="/" class="nav-link" :class="linkClass">Home</RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink
            :to="`/profile/${authStore.email || 'not-logged'}`"
            class="nav-link"
            :class="linkClass"
            >Profile
          </RouterLink>
        </li>
        <li class="nav-item nav-item-collapse px-2">
          <RouterLink to="/about" class="nav-link" :class="linkClass">About</RouterLink>
        </li>
        <div v-if="!isLoggedIn">
          <li class="nav-item nav-item-collapse px-2">
            <RouterLink to="/Login" class="nav-link" :class="linkClass">Login</RouterLink>
          </li>
        </div>
        <div v-else>
          <li class="nav-item nav-item-collapse px-2">
            <button @click="logout" class="nav-link" :class="linkClass">Logout</button>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<style>
.nav-item-collapse:hover {
  border-radius: 8px;
  background-color: #23262d;
}
</style>
