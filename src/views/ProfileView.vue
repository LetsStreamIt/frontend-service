<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import ApiClient from '@/middlewares/apiClient'
import ProfileInformations from '@/components/profile/ProfileInformations.vue'
import WatchedVideos from '@/components/profile/WatchedVideos.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  email: string
}>()

const profileUrl = import.meta.env.VITE_PROFILE_URL || 'http://localhost:8080'

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
