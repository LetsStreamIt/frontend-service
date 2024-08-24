import { defineStore } from 'pinia'

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
    refreshToken() {
      // TODO: call the refresh token endpoint
      // and update the accessToken and refreshToken
    }
  }
})
