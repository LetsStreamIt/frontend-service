<script setup lang="ts">
/**
 * @file SessionView.vue
 * @module SessionView
 * Session View
 */
import SessionChat from '@/components/session/chat/SessionChat.vue'
import SessionFrame from '@/components/session/video/SessionFrame.vue'
import { ref, onUnmounted } from 'vue'
import {
  ConnectionStatus,
  type ISessionController,
  WsSessionController
} from '@/controllers/session/sessionController'
import { useRoute } from 'vue-router'
import { JoinSessionResponseStatus, JoinSessionResponse } from '@/model/session/command/response'
import { connectToSession, connectionErrors } from '@/composables/session/connection'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const sessionServiceUrl = ref<string>('/api/session/')

const videoId = ref<string>('')
const isChatMounted = ref<boolean>(false)
const isFrameMounted = ref<boolean>(false)

const authStore = useAuthStore()

// Session Controller
const sessionController: ISessionController = new WsSessionController(
  sessionServiceUrl.value,
  authStore.accessToken
)

// Handle connection and errors from he Session Service
const { connectionStatus, connectionErrorMessage } = connectionErrors()
const { connected } = connectToSession(sessionController, connectionStatus)

/**
 * Sets chat mounted flag and eventually joins the session if the frame is mounted as well.
 */
function chatMounted() {
  isChatMounted.value = true
  if (isFrameMounted.value) {
    joinSession()
  }
}

/**
 * Sets frame mounted flag and eventually joins the session if the chat is mounted as well.
 */
function frameMounted() {
  isFrameMounted.value = true
  if (isChatMounted.value) {
    joinSession()
  }
}

/**
 * Join Session function.
 * Joins the Session given the Session name specified in the route,
 * if the connection has been previously estabilished.
 * Sets the connection status variable if an error occurred.
 */
function joinSession() {
  if (connected.value) {
    sessionController
      .joinSession(route.params.sessionName as string)
      .then((joinSessionResponse: JoinSessionResponse) => {
        if (joinSessionResponse.content.status === JoinSessionResponseStatus.SUCCESS) {
          videoId.value = joinSessionResponse.content.videoId
          connected.value = true
        } else {
          connected.value = false
          switch (joinSessionResponse.content.status) {
            case JoinSessionResponseStatus.SESSION_NOT_FOUND:
              connectionStatus.value = ConnectionStatus.SESSION_NOT_FOUND
              break
            case JoinSessionResponseStatus.USER_ALREADY_JOINED:
              connectionStatus.value = ConnectionStatus.USER_ALREADY_JOINED
              break
            default:
              break
          }
        }
      })
  }
}

onUnmounted(() => {
  sessionController.leaveSession()
})
</script>

<template>
  <div v-if="connected" class="my-pr-0 row h-80 pb-5">
    <div class="my-pr-0 col-md-8 col-12 d-flex flex-column flex-md-row">
      <div class="flex-fill">
        <SessionFrame
          :videoController="sessionController.videoController"
          :videoId="videoId"
          @frameMounted="frameMounted"
        />
      </div>
    </div>
    <div class="my-pr-0 col-md-4 col-12 d-flex flex-column flex-md-row">
      <div class="flex-fill chat-container mt-auto">
        <SessionChat
          :chatController="sessionController.chatController"
          @chatMounted="chatMounted"
        />
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center h-100 py-5">
    <p>{{ connectionErrorMessage }}</p>
  </div>
</template>

<style lang="scss" scoped>
@media (max-width: 767.98px) {
  .flex-fill {
    height: 40vh;
  }
  .chat-container {
    margin-top: 10px !important;
  }
}
.my-pr-0 {
  padding-right: 0px;
}
</style>
