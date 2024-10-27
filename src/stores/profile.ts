import ApiClient from '@/middlewares/apiClient'
import { defineStore } from 'pinia'
import { standardConfig } from '../config'
import type { UserProfileState } from '@/model/profile/userProfileState'

export const useProfileStore = defineStore('profile', {
  state: (): UserProfileState => {
    return {
      email: localStorage.getItem('email') || '',
      username: localStorage.getItem('username') || '',
      url: `http://${standardConfig.PROFILE_SERVICE_HOSTNAME}:${standardConfig.PROFILE_SERVICE_PORT}`
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
    },
    async addWatchedVideo(videoId: string) {
      const response = await ApiClient.post(`${this.url}/videos`, {
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
