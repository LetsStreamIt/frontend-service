<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../../controllers/session/sessionController'
import { ResponseStatus, TokenStatus, UserTokenResponse } from '../../controllers/session/ack';

const videoId = ref('')
const router = useRouter()

const emit = defineEmits<{
  createSession: []
}>()

const sessionServiceUrl = ref('http://localhost:3000')
const connected = ref(false)
const connectionErrorMessage = ref('')

function setErrorMessage(error) {
  switch (error) {
    case ConnectionStatus.CONNECTION_ERROR:
      connectionErrorMessage.value =
        'Unable to connect to the Session Service. Please try again later.'
      break
    case ConnectionStatus.USER_ALREADY_JOINED:
      connectionErrorMessage.value =
        'Unable to Join. Your account is already connected to another Session.'
      break
    case ConnectionStatus.SESSION_NOT_FOUND:
      connectionErrorMessage.value =
        'Unable to Join. Session not found.'
      break
    case ConnectionStatus.INVALID_TOKEN:
      connectionErrorMessage.value = 'Unable to Join. Invalid token provided.'
      break
  }
}

function connectToSession() {
  sessionController
    .connect()
    .then((userTokenResponse: UserTokenResponse) => {
      if (userTokenResponse.content.status === ResponseStatus.SUCCESS) {
        connected.value = true
      } else {
        connected.value = false
        setErrorMessage(ConnectionStatus.INVALID_TOKEN)
      }
    })
}

const sessionController: SessionController = new SessionControllerImpl(
  sessionServiceUrl.value,
  'token'
)

onMounted(() => {
  connectToSession()
})

onUnmounted(async () => {
  await sessionController.disconnectFromSession()
})

function createSession() {
  if (videoId.value) {
    sessionController
      .createSession(videoId.value)
      .then((ack) => {
        connected.value = true
        sessionController.disconnectFromSession()
        router.push(`/session/${ack.content.sessionName}`)
        emit('createSession')
      })
      .catch(() => {
        setErrorMessage(ConnectionStatus.INVALID_VIDEO_ID)
        connected.value = false
      })
  }
}
</script>

<template>
  <div class="modal" id="createSessionPopup" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-dark" aria-hidden="true">
        <div class="modal-header">
          <h5 class="modal-title">Create a new Session</h5>
          <button
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
                v-model="videoId"
              />
            </div>

            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
