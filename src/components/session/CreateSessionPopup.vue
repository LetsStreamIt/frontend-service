<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '@/controllers/session/sessionController'
import { connectToSession, connectionErrors } from '@/composables/session/connection'
import { CreateSessionResponse, ResponseStatus } from '@/model/command/response'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  closePopup: []
}>()

const videoUrl = ref<string>('')
const router: Router = useRouter()

const sessionServiceUrl = ref<string>('http://localhost:4000')
const authStore = useAuthStore()

const createSessionModal = ref<bootstrap.Modal | undefined>(undefined)
const sessionController = ref<SessionController>(
  new SessionControllerImpl(sessionServiceUrl.value, authStore.accessToken)
)

const { connectionStatus, connectionErrorMessage } = connectionErrors()
const { connected } = connectToSession(sessionController.value, connectionStatus)

function closePopup() {
  hideCreateSessionPopup()
  emit('closePopup')
}

function hideCreateSessionPopup() {
  if (createSessionModal.value) {
    createSessionModal.value.hide()
    sessionController.value.disconnect()
  }
}

function createSession() {
  if (connected.value && videoUrl.value) {
    sessionController.value
      .createSession(videoUrl.value)
      .then((createSessionResponse: CreateSessionResponse) => {
        if (createSessionResponse.content.status === ResponseStatus.SUCCESS) {
          connected.value = true
          router.push(`/session/${createSessionResponse.content.sessionName}`)
          closePopup()
        } else {
          connected.value = false
          connectionStatus.value = ConnectionStatus.INVALID_VIDEO_ID
        }
      })
  }
}

onMounted(() => {
  createSessionModal.value = new bootstrap.Modal('#createSessionPopup')
  createSessionModal.value.show()
})
</script>

<template>
  <div class="modal" id="createSessionPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-dark" aria-hidden="true">
        <div class="modal-header">
          <h5 class="modal-title">Create a new Session</h5>
          <button
            @click="closePopup()"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createSession">
            <div class="form-group">
              <label for="youtubeVideoUrl">Youtube Video URL:</label>
              <input
                class="form-control mt-2"
                id="youtubeVideoUrl"
                placeholder="Enter Youtube Video URL"
                v-model="videoUrl"
              />
            </div>

            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                Create Session
              </button>
            </div>
          </form>
          <div v-if="!connected" class="text-danger">
            {{ connectionErrorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
