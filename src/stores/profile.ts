import ApiClient from '@/middlewares/apiClient'
import { defineStore } from 'pinia'

interface State {
  email: string
  username: string
  url: string
}

export const useProfileStore = defineStore('profile', {
  state: (): State => {
    return {
      email: localStorage.getItem('email') || '',
      username: localStorage.getItem('username') || '',
      url: import.meta.env.PROFILE_URL || 'http://localhost:8080'
    }
  },
  actions: {
    setUsername(username: string) {
      this.username = username
      localStorage.setItem('username', username)
    },
    async getProfileInfo() {
      const response = await ApiClient.get(`${this.url}/users/${this.email}`)
      if (response.status === 200) {
        this.setUsername(response.data.username)
      }
    },
    async updateProfileInfo(username: string, bio: string) {
      const response = await ApiClient.post(`${this.url}/users/update`, {
        email: this.email,
        username,
        bio
      })
      if (response.status === 201) {
        this.setUsername(username)
        return true
      }
      return false
    }
  },
  getters: {
    isCurrentUser: (state) => (email: string) => {
      return state.email === email
    }
  }
})
