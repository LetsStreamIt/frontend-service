import ApiClient from '@/middlewares/apiClient'
import { defineStore } from 'pinia'
import type { UserProfileState } from '@/model/profile/userProfileState'

const profilePath = '/api/profile'

export const useProfileStore = defineStore('profile', {
  state: (): UserProfileState => {
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
      const response = await ApiClient.get(`${profilePath}/users/${this.email}`)
      if (response.status === 200) {
        this.setUsername(response.data.username)
      }
    },
    async updateProfileInfo(username: string, bio: string) {
      const response = await ApiClient.post(`${profilePath}/users/update`, {
        email: this.email,
        username,
        bio
      })
      if (response.status === 201) {
        this.setUsername(username)
        return true
      }
      return false
    },
    async addWatchedVideo(videoId: string) {
      const response = await ApiClient.post(`${profilePath}/videos`, {
        videoId
      })
      return response.status === 201
    }
  },
  getters: {
    isCurrentUser: (state) => (email: string) => {
      return state.email === email
    }
  }
})
