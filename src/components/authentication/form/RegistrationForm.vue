<template>
  <div class="form-register mt-auto row text-center justify-content-center p-3">
    <div class="col-lg-6 col-md-8">
      <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
      <form @submit.prevent="submitForm" novalidate>
        <div class="pt-3">
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
            <div :class="`form-group col-lg-6 ${passwordErrors.length == 0 && 'mb-4'}`">
              <InputField
                id="password"
                label="Password"
                type="password"
                v-model="password"
                placeholder="Password"
                :errors="passwordErrors"
                required
              />
            </div>
            <div :class="`form-group col-lg-6 ${confirmPasswordError.length == 0 && 'mb-4'}`">
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm Password"
                :errors="confirmPasswordError"
                required
              />
            </div>
          </div>
          <div v-if="form.success" class="alert alert-success mt-3" role="alert">
            Account created successfully. You will be redirected to the login page.
          </div>
          <div v-if="form.error" class="alert alert-danger mt-3" role="alert">
            {{ form.error }}
          </div>
        </div>
        <div class="text-center mt-4">
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
import { usePasswordValidator } from '@/composables/registration/password'
import { IRegistrationData } from '@/controllers/authController/registrationController'

const router = useRouter()

interface FormState {
  username: string
  error: string
  success: boolean
}

const { email, emailError, isValidEmail } = useEmailValidator()

const {
  password,
  confirmPassword,
  passwordErrors,
  confirmPasswordError,
  isValidPassword,
  isMatch
} = usePasswordValidator()

const form = ref<FormState>({
  username: '',
  error: '',
  success: false
})

function submitForm() {
  form.value.error = ''
  if (!form.value.username) {
    form.value.error = 'Please enter a username'
    return
  }
  if (!isValidPassword.value) {
    form.value.error = 'Invalid password'
    return
  }
  if (!isMatch.value) {
    form.value.error = 'Passwords do not match'
    return
  }
  if (!isValidEmail.value) {
    form.value.error = 'Please enter a valid email address'
    return
  }
  const authUrl = import.meta.env.VITE_AUTH_URL || 'http://localhost:3000'
  const registerUrl = `${authUrl}/api/auth/register`

  const formData: IRegistrationData = {
    username: form.value.username,
    email: email.value,
    password: password.value
  }

  axios
    .post(registerUrl, formData)
    .then(() => {
      form.value.success = true
      setTimeout(() => {
        router.push('/login')
      }, 3000)
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
