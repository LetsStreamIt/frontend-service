<template>
  <div class="form-signin mt-auto row text-center justify-content-center p-3">
    <div class="col-lg-4 col-md-6">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <form @submit.prevent="submitForm" novalidate>
        <div class="py-3">
          <InputField
            id="email"
            label="Email"
            type="email"
            v-model="form.email"
            placeholder="Email"
            autofocus
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            v-model="form.password"
            placeholder="Password"
            required
          />
          <div v-if="form.error" class="alert alert-danger mt-3" role="alert">
            {{ form.error }}
          </div>
        </div>
        <div class="text-center my-2">
          <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
        </div>
        <div class="text-center mt-3">
          <p>Not a member? <RouterLink to="/register">Create an account</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file LoginForm.vue
 * @module LoginForm
 * Login form component.
 */
import { ref } from 'vue'
import InputField from './InputField.vue'
import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { standardConfig } from '../../../config'

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
  /**
   * Login the user.
   */
  const authUrl = `http://${standardConfig.AUTH_SERVICE_HOSTNAME}:${standardConfig.AUTH_SERVICE_PORT}`
  const loginUrl = `${authUrl}/api/auth/login`
  axios
    .post(loginUrl, form.value, { withCredentials: true })
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

<style lang="scss">
.form-signin {
  .logo {
    max-width: 100%;
  }

  input[type='email'] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  input[type='password'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  button[type='submit'] {
    width: 100%;
  }
}
</style>
