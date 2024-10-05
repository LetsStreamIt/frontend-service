import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

export class RefreshError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RefreshError'
  }
}

const apiClient = axios.create({
  timeout: 10000,
  withCredentials: true
})

apiClient.interceptors.request.use(
  async (config) => {
    const token = authStore.accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (await authStore.isLoggedIn()) {
      // Token is still valid
      return config
    } else {
      // Refresh token is also invalid, must go back to login
      return Promise.reject(new RefreshError('Refresh token is invalid'))
    }
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error)
  }
)

export default apiClient
