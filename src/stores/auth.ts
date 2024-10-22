import axios from 'axios'
import { defineStore } from 'pinia'
import { useProfileStore } from './profile'

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
      email: localStorage.getItem('email') || '',
      accessToken: localStorage.getItem('accessToken') || '',
      refreshToken: localStorage.getItem('refreshToken') || ''
    }
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
      localStorage.setItem('accessToken', accessToken)
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken
      localStorage.setItem('refreshToken', refreshToken)
    },
    setEmail(email: string) {
      this.email = email
      localStorage.setItem('email', email)
    },
    login(id: string, email: string, accessToken: string, refreshToken: string) {
      this.id = id
      this.setEmail(email)
      this.setAccessToken(accessToken)
      this.setRefreshToken(refreshToken)
      useProfileStore().getProfileInfo()
    },
    logout() {
      this.id = ''
      this.setEmail('')
      this.setAccessToken('')
      this.setRefreshToken('')
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
          this.setAccessToken(refreshedToken)
          return true
        }
      } catch {
        return false
      }
    },
    async isLoggedIn() {
      try {
        await axios.post(
          `${authUrl}/api/auth/validate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.accessToken || ''}`
            }
          }
        )
        return true
      } catch (error) {
        console.error('Error validating token', error)
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
