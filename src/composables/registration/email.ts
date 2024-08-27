import { ref, watch } from 'vue'
export function useEmailValidator() {
  const email = ref('')
  const emailError = ref<string[]>([])
  const isValidEmail = ref(false)

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    isValidEmail.value = emailPattern.test(email.value)
  }

  watch(email, () => {
    validateEmail()
    if (!isValidEmail.value) {
      emailError.value = ['Invalid email address']
    } else {
      emailError.value = []
    }
  })
  return { email, emailError, isValidEmail }
}
