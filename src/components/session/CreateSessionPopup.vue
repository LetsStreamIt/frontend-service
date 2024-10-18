<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../../controllers/session/sessionController'
import { connectToSession, watchConnectionErrors } from '../../composables/session/connection'
import { CreateSessionResponse, ResponseStatus } from '../../model/command/response'

const videoUrl = ref('')
const router = useRouter()

const emit = defineEmits<{
  createSession: []
}>()

const sessionServiceUrl = ref<string>('http://localhost:3000')

const sessionCreated = ref<boolean>(false)
const { connectionStatus, connectionErrorMessage } = watchConnectionErrors()

const sessionController: SessionController = new SessionControllerImpl(
  sessionServiceUrl.value,
  'token'
)

const connected = connectToSession(sessionController, connectionStatus)

onUnmounted(() => {
  sessionController.disconnectFromSession()
})

function createSession() {
  if (connected.value) {
    if (videoUrl.value) {
      sessionController
        .createSession(videoUrl.value)
        .then((createSessionResponse: CreateSessionResponse) => {
          console.log(createSessionResponse)
          if (createSessionResponse.content.status === ResponseStatus.SUCCESS) {
            sessionCreated.value = true
            router.push(`/session/${createSessionResponse.content.sessionName}`)
            emit('createSession')
          } else {
            sessionCreated.value = false
            connectionStatus.value = ConnectionStatus.INVALID_VIDEO_ID
          }
        })
    }
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
                v-model="videoUrl"
              />
            </div>

            <div class="d-flex flex-row-reverse mt-2">
              <button type="submit" class="btn btn-primary justify-content-end">
                Create Session
              </button>
            </div>
          </form>
          <div v-if="!connected || !sessionCreated" class="text-danger">
            {{ connectionErrorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
