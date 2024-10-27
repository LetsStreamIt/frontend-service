<script setup lang="ts">
/**
 * @file CreateSessionPopup.vue
 * @module CreateSessionPopup
 * Create Session Popup Component
 */
import { onMounted, ref } from 'vue'
import { type Router, useRouter } from 'vue-router'
import {
  ConnectionStatus,
  type ISessionController,
  WsSessionController
} from '@/controllers/session/sessionController'
import { connectToSession, connectionErrors } from '@/composables/session/connection'
import { CreateSessionResponse, ResponseStatus } from '@/model/session/command/response'
import { useAuthStore } from '@/stores/auth'
import { Modal } from 'bootstrap'
import { standardConfig } from '../../config'

const emit = defineEmits<{
  /**
   * Message to emit whenever the popup is closed.
   */
  closePopup: []
}>()

const videoUrl = ref<string>('')
const router: Router = useRouter()

const sessionServiceUrl = ref<string>(
  `http://${standardConfig.SESSION_SERVICE_HOSTNAME}:${standardConfig.SESSION_SERVICE_PORT}`
)
const authStore = useAuthStore()

const createSessionModal = ref<Modal | undefined>(undefined)
// Session Controller to handle communication with the Session Service.
const sessionController = ref<ISessionController>(
  new WsSessionController(sessionServiceUrl.value, authStore.accessToken)
)
// Handle connection and errors from he Session Service
const { connectionStatus, connectionErrorMessage } = connectionErrors()
const { connected } = connectToSession(sessionController.value, connectionStatus)

/**
 * Close Popup function.
 */
function closePopup() {
  hidePopupAndDisconnect()
  emit('closePopup')
}

/**
 * Hide Popup and disconnects from the backend
 */
function hidePopupAndDisconnect() {
  if (createSessionModal.value) {
    createSessionModal.value.hide()
    sessionController.value.disconnect()
  }
}

/**
 * Create Session function.
 * Uses the Session Controller to send a create Session request.
 * If successful, redirects to the Session page.
 */
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
  createSessionModal.value = new Modal('#createSessionPopup')
  createSessionModal.value.show()
  const modalElement = document.getElementById('createSessionPopup')
  if (modalElement) {
    modalElement.addEventListener('hidden.bs.modal', () => closePopup())
  }
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
