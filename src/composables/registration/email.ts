import { ref, watch, Ref } from 'vue'
export function useEmailValidator() {
  const email = ref('')
  const emailError: Ref<string[]> = ref([])
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
    console.log('emailError', emailError.value)
  })
  return { email, emailError, isValidEmail }
}
