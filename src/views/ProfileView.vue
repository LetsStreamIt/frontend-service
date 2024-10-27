<script setup lang="ts">
/**
 * @file ProfileView.vue
 * @module ProfileView
 * Profile view component.
 */
import { onMounted, type Ref, ref } from 'vue'
import ApiClient from '@/middlewares/apiClient'
import ProfileInformations from '@/components/profile/ProfileInformations.vue'
import WatchedVideos from '@/components/profile/WatchedVideos.vue'
import { useRouter } from 'vue-router'
import { standardConfig } from '../config'

const props = defineProps<{
  /**
   * The email of the user.
   */
  email: string
}>()

const profileUrl = `http://${standardConfig.PROFILE_SERVICE_HOSTNAME}:${standardConfig.PROFILE_SERVICE_PORT}`

const router = useRouter()

const email = ref(props.email)
const username = ref('')
const bio = ref('')
const videos: Ref<string[]> = ref([])

const fetchProfile = async () => {
  try {
    const response = await ApiClient.get(`${profileUrl}/users/${email.value}`)
    if (response.status === 200) {
      const data = response.data
      username.value = data.username
      bio.value = data.bio
      videos.value = data.videos.reverse()
    }
  } catch {
    console.log('User not found')
    router.push({ path: '/404' })
  }
}

onMounted(async () => {
  await fetchProfile()
})
</script>

<template>
  <div class="profile-page">
    <ProfileInformations :email="email" :username="username" :bio="bio" />
    <WatchedVideos :videos="videos" />
  </div>
</template>
