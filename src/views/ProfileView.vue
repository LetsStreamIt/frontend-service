<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApiClient from '@/middlewares/apiClient'
import ProfileInformationsComponent from '@/components/profile/ProfileInformationsComponent.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  email: string
}>()

const profileUrl = import.meta.env.PROFILE_URL || 'http://localhost:8080'

const router = useRouter()

const email = ref(props.email)
const username = ref('')
const bio = ref('')

const fetchProfile = async () => {
  try {
    const response = await ApiClient.get(`${profileUrl}/users/${email.value}`)
    if (response.status === 200) {
      console.log(response.data)
      const data = response.data
      username.value = data.username
      bio.value = data.bio
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
    <ProfileInformationsComponent :email="email" :username="username" :bio="bio" />
  </div>
</template>
