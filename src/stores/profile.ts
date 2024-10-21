import ApiClient from '@/middlewares/apiClient'
import { defineStore } from 'pinia'

const profileUrl = import.meta.env.PROFILE_URL || 'http://localhost:8080'

interface State {
  email: string
  username: string
}

export const useProfileStore = defineStore('profile', {
  state: (): State => {
    return {
      email: localStorage.getItem('email') || '',
      username: localStorage.getItem('username') || ''
    }
  },
  actions: {
    setUsername(username: string) {
      this.username = username
      localStorage.setItem('username', username)
    },
    async getProfileInfo() {
      const response = await ApiClient.get(`${profileUrl}/users/${this.email}`)
      if (response.status === 200) {
        this.setUsername(response.data.username)
      }
    }
  }
})
