<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/video/SessionFrame.vue'
import { ref, onUnmounted } from 'vue'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../controllers/session/sessionController'
import { useRoute } from 'vue-router'
import { JoinSessionResponseType, JoinSessionResponse } from '../model/command/response'
import { connectToSession, connectionErrors } from '../composables/session/connection'

const route = useRoute()
const sessionServiceUrl = ref<string>('http://localhost:3000')

const videoId = ref<string>('')
const isChatMounted = ref<boolean>(false)
const isFrameMounted = ref<boolean>(false)

const sessionController: SessionController = new SessionControllerImpl(
  sessionServiceUrl.value,
  'token'
)
const joined = ref<boolean>(false)

function chatMounted() {
  isChatMounted.value = true
  if (isFrameMounted.value) {
    joinSession()
  }
}

function frameMounted() {
  isFrameMounted.value = true
  if (isChatMounted.value) {
    joinSession()
  }
}

const { connectionStatus, connectionErrorMessage } = connectionErrors()
const connected = connectToSession(sessionController, connectionStatus)

function joinSession() {
  if (connected.value) {
    sessionController
      .joinSession(route.params.sessionName as string)
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.responseType === JoinSessionResponseType.SUCCESS) {
          videoId.value = joinSessionResponse.content.videoId
          joined.value = true
        } else {
          joined.value = false
          switch (joinSessionResponse.content.responseType) {
            case JoinSessionResponseType.SESSION_NOT_FOUND:
              connectionStatus.value = ConnectionStatus.SESSION_NOT_FOUND
              break
            case JoinSessionResponseType.USER_ALREADY_JOINED:
              connectionStatus.value = ConnectionStatus.USER_ALREADY_JOINED
              break
            default:
              break
          }
        }
      })
  }
}

onUnmounted(async () => {
  await sessionController.leaveSession()
})
</script>

<template>
  <div v-if="connected" class="row h-100 py-5">
    <div class="col-md-8 col-12 py-5">
      <SessionFrame
        :videoController="sessionController.getVideoController"
        :videoId="videoId"
        @frameMounted="frameMounted"
      />
    </div>
    <div class="col-md-4 col-12 d-flex align-items-end py-5">
      <SessionChat
        :chatController="sessionController.getChatController"
        @chatMounted="chatMounted"
      />
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 py-5">
    <p>{{ connectionErrorMessage }}</p>
  </div>
</template>
