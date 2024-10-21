<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'

const props = defineProps<{
  email: string
  username: string
  bio: string
}>()

const email = ref(props.email)
const username = ref(props.username)
const bio = ref(props.bio)

const error = ref('')
const updateSuccess = ref(false)

const profileStore = useProfileStore()

const canEdit = computed(() => {
  return profileStore.isCurrentUser(email.value)
})

watch(
  () => props.email,
  () => {
    email.value = props.email
  }
)
watch(
  () => props.username,
  () => {
    username.value = props.username
  }
)
watch(
  () => props.bio,
  () => {
    bio.value = props.bio
  }
)

const updateProfile = async () => {
  try {
    const result = await profileStore.updateProfileInfo(username.value, bio.value)
    if (result) {
      updateSuccess.value = true
      error.value = ''
    }
  } catch {
    console.log('An error occurred')
    updateSuccess.value = false
    error.value = 'An error occurred. Please try again later.'
  }
}
</script>

<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container col-md-6">
        <form @submit.prevent="updateProfile">
          <div class="profile-header">
            <h1>Profile</h1>
            <div class="py-1">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" v-model="email" readonly />
            </div>
            <div class="py-1">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="username" />
            </div>
          </div>
          <div class="py-1 profile-bio">
            <label for="bio" class="form-label">Bio</label>
            <textarea class="form-control" id="bio" v-model="bio" />
          </div>
          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            {{ error }}
          </div>
          <div v-if="updateSuccess" class="alert alert-success mt-3" role="alert">
            Profile updated successfully
          </div>
          <div v-if="canEdit" class="d-flex justify-content-end py-1">
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
