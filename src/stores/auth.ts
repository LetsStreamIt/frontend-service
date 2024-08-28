import axios from 'axios'
import { defineStore } from 'pinia'

const authUrl = import.meta.env.AUTH_URL || 'http://localhost:3000'

interface State {
  id: string
  email: string
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      id: '',
      email: '',
      accessToken: '',
      refreshToken: ''
    }
  },
  actions: {
    login(id: string, email: string, accessToken: string, refreshToken: string) {
      this.id = id
      this.email = email
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    logout() {
      this.id = ''
      this.email = ''
      this.accessToken = ''
      this.refreshToken = ''
    },
    async refreshToken() {
      try {
        const { data } = await axios.post(
          `${authUrl}/api/auth/refresh`,
          {},
          { withCredentials: true }
        )
        const refreshedToken = data.accessToken
        if (refreshedToken) {
          this.accessToken = refreshedToken
          return true
        }
      } catch (refreshError) {
        return false
      }
    },
    async isLoggedIn() {
      try {
        await axios.post(
          `${authUrl}/api/auth/validate`,
          {
            headers: {
              Authorization: `Bearer ${this.token || ''}`
            }
          },
          { withCredentials: true }
        )
      } catch (error) {
        if (error.response && error.response.status === 401) {
          if (await this.refreshToken()) {
            return true
          }
        }
        return false
      }
    }
  }
})
