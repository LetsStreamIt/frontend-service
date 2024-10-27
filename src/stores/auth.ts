import axios from 'axios'
import { defineStore } from 'pinia'
import { useProfileStore } from './profile'
import { standardConfig } from '../config'
import type { UserAuthState } from '@/model/auth/userAuthState'

const authUrl = `http://${standardConfig.AUTH_SERVICE_HOSTNAME}:${standardConfig.AUTH_SERVICE_PORT}`

export const useAuthStore = defineStore('auth', {
  state: (): UserAuthState => {
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
    async refreshAccessToken() {
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
          try {
            if (await this.refreshAccessToken()) {
              return true
            }
          } catch {
            return false
          }
        }
        return false
      }
    }
  }
})
