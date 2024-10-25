import { ref, watch } from 'vue'
export function usePasswordValidator() {
  /**
   * Password validation
   * - Password must be at least 8 characters
   * - Password must contain at least one uppercase letter
   * - Password must contain at least one lowercase letter
   * - Password must contain at least one number
   * - Password must contain at least one special character
   * - Password and confirm password should match
   */
  const password = ref('')
  const confirmPassword = ref('')
  const passwordErrors = ref<string[]>([])
  const confirmPasswordError = ref<string[]>([])
  const isValidPassword = ref(false)
  const isMatch = ref(false)

  const validatePassword = () => {
    passwordErrors.value = []
    if (password.value.length < 8) {
      passwordErrors.value.push('Password must be at least 8 characters')
    }
    if (!/[A-Z]/.test(password.value)) {
      passwordErrors.value.push('Password must contain at least one uppercase letter')
    }
    if (!/[a-z]/.test(password.value)) {
      passwordErrors.value.push('Password must contain at least one lowercase letter')
    }
    if (!/[0-9]/.test(password.value)) {
      passwordErrors.value.push('Password must contain at least one number')
    }
    if (!/[!@#$%^&*]/.test(password.value)) {
      passwordErrors.value.push('Password must contain at least one special character')
    }
    isValidPassword.value = passwordErrors.value.length === 0
  }

  const validateConfirmPassword = () => {
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = ['Passwords do not match']
      isMatch.value = false
    } else {
      confirmPasswordError.value = []
      isMatch.value = true
    }
  }

  watch(password, () => {
    validatePassword()
    validateConfirmPassword()
  })

  watch(confirmPassword, () => {
    validateConfirmPassword()
  })

  return {
    password,
    confirmPassword,
    passwordErrors,
    confirmPasswordError,
    isValidPassword,
    isMatch
  }
}
