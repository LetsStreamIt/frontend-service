<script setup lang="ts">
import SessionChat from '../components/session/chat/SessionChat.vue'
import SessionFrame from '../components/session/video/SessionFrame.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import {
  ConnectionStatus,
  SessionController,
  SessionControllerImpl
} from '../controllers/session/sessionController'
import { useRoute } from 'vue-router'
import {
  UserTokenResponse,
  ResponseStatus,
  JoinSessionResponseType,
  JoinSessionResponse
} from '../model/command/response'

const route = useRoute()
const sessionServiceUrl = ref('http://localhost:3000')

const connected = ref(false)
const connectionErrorMessage = ref('')
const videoId = ref('')

const isChatMounted = ref(false)
const isFrameMounted = ref(false)

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
      connectionErrorMessage.value = 'Unable to Join. Session not found.'
      break
    case ConnectionStatus.INVALID_TOKEN:
      connectionErrorMessage.value = 'Unable to Join. Invalid token provided.'
      break
  }
}

function connectToSession() {
  sessionController.connect().then((userTokenResponse: UserTokenResponse) => {
    if (userTokenResponse.content.status === ResponseStatus.SUCCESS) {
      connected.value = true
    } else {
      connected.value = false
      setErrorMessage(ConnectionStatus.INVALID_TOKEN)
    }
  })
}

function joinSession() {
  sessionController
    .joinSession(route.params.sessionName)
    .then((joinSessionResponse: JoinSessionResponse) => {
      if (joinSessionResponse.content.responseType === JoinSessionResponseType.SUCCESS) {
        videoId.value = joinSessionResponse.content.videoId
        connected.value = true
      } else {
        connected.value = false
        switch (joinSessionResponse.content.responseType) {
          case JoinSessionResponseType.SESSION_NOT_FOUND:
            setErrorMessage(ConnectionStatus.SESSION_NOT_FOUND)
            break
          case JoinSessionResponseType.USER_ALREADY_JOINED:
            setErrorMessage(ConnectionStatus.USER_ALREADY_JOINED)
            break
        }
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
