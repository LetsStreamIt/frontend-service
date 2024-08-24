<template>
  <form @submit.prevent="submitForm" novalidate>
    <InputField
      id="email"
      label="Email"
      type="email"
      v-model="form.email"
      placeholder="Enter your email"
    />
    <InputField
      id="password"
      label="Password"
      type="password"
      v-model="form.password"
      placeholder="Enter your password"
    />
    <div v-if="form.error" class="alert alert-danger mt-3" role="alert">
      {{ form.error }}
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputField from './InputField.vue'
import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FormState {
  email: string
  password: string
  error: string
}

const form = ref<FormState>({
  email: '',
  password: '',
  error: ''
})

const authStore = useAuthStore()

function submitForm() {
  const authUrl = import.meta.env.AUTH_URL || 'http://localhost:3000'
  const loginUrl = `${authUrl}/api/auth/login`
  axios
    .post(loginUrl, form.value)
    .then((response) => {
      const { _id, email, accessToken, refreshToken } = response.data
      authStore.login(_id, email, accessToken, refreshToken)
      router.push('/')
    })
    .catch((error) => {
      if (error instanceof AxiosError && error.status === 401) {
        form.value.error = 'Invalid email or password'
      } else {
        form.value.error = 'An error occurred. Please try again later.'
      }
    })
}
</script>
