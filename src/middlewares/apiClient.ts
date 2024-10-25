import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export class RefreshError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RefreshError'
  }
}

/**
 * Axios instance for API requests
 * - Timeout: 10 seconds
 * - With credentials: true
 */
const apiClient = axios.create({
  timeout: 10000,
  withCredentials: true
})

/**
 * Request interceptor
 * - Add Authorization header with access token
 * - Check if access token is still valid
 * - If not, reject the request
 * - If valid, continue with the request
 * - If refresh token is invalid, reject the request
 */
apiClient.interceptors.request.use(
  async (config) => {
    const authStore = useAuthStore()
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
