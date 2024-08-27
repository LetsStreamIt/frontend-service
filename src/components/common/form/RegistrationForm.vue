<template>
  <div class="form-register mt-auto row text-center justify-content-center p-3">
    <div class="col-lg-6 col-md-8">
      <!-- TODO: insert logo -->
      <img class="mb-5 logo" src="https://via.placeholder.com/300x150" alt="Logo" />
      <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
      <form @submit.prevent="submitForm" novalidate>
        <div class="py-3">
          <div class="row">
            <div class="form-group col-lg-6 mb-4">
              <InputField
                id="username"
                label="Username"
                type="text"
                v-model="form.username"
                placeholder="Username"
                autofocus
                required
              />
            </div>
            <div :class="`form-group col-lg-6 ${emailError.length == 0 && 'mb-4'}`">
              <InputField
                id="email"
                label="Email"
                type="email"
                v-model="email"
                placeholder="Email"
                :errors="emailError"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-lg-6 mb-4">
              <InputField
                id="password"
                label="Password"
                type="password"
                v-model="form.password"
                placeholder="Password"
                required
              />
            </div>
            <div class="form-group col-lg-6 mb-4">
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                v-model="form.confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
          </div>
          <InputField
            id="profilePicture"
            label="Profile Picture"
            type="file"
            @change="handleFileUpload"
            required
          />
          <div v-if="form.error" class="alert alert-danger mt-3" role="alert">
            {{ form.error }}
          </div>
        </div>
        <div class="text-center my-2">
          <button type="submit" class="btn btn-primary btn-lg btn-block">Sign Up</button>
        </div>
        <div class="text-center mt-3">
          <p>Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputField from './InputField.vue'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import { useEmailValidator } from '@/composables/registration/email'

const router = useRouter()

interface FormState {
  username: string
  password: string
  confirmPassword: string
  profilePicture: File | null
  error: string
}

const { email, emailError, isValidEmail } = useEmailValidator()

const form = ref<FormState>({
  username: '',
  password: '',
  confirmPassword: '',
  profilePicture: null,
  error: ''
})

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    form.value.profilePicture = files[0]
  }
}

function submitForm() {
  form.value.error = ''
  if (form.value.password !== form.value.confirmPassword) {
    form.value.error = 'Passwords do not match'
    return
  }
  if (!isValidEmail.value) {
    form.value.error = 'Please enter a valid email address'
    return
  }
  const authUrl = import.meta.env.AUTH_URL || 'http://localhost:3000'
  const registerUrl = `${authUrl}/api/auth/register`

  const formData = new FormData()
  formData.append('username', form.value.username)
  formData.append('email', email.value)
  formData.append('password', form.value.password)
  if (form.value.profilePicture) {
    formData.append('profilePicture', form.value.profilePicture)
  }

  axios
    .post(registerUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      if (error instanceof AxiosError && error.response) {
        form.value.error =
          error.response.data.message || 'An error occurred. Please try again later.'
      } else {
        form.value.error = 'An error occurred. Please try again later.'
      }
    })
}
</script>

<style lang="scss">
.form-register {
  display: flex;
  .logo {
    max-width: 100%;
  }
  button[type='submit'] {
    width: 100%;
  }
}
</style>
