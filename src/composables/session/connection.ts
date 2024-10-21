import { Ref, ref, watch } from 'vue'
import { ConnectionStatus, SessionController } from '@/controllers/session/sessionController'
import { UserTokenResponse, ResponseStatus } from '@/model/command/response'

export function connectionErrors() {
  const connectionStatus = ref<ConnectionStatus>(ConnectionStatus.DISCONNECTED)
  const connectionErrorMessage = ref<string>('')

  watch(connectionStatus, () => {
    switch (connectionStatus.value) {
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
        connectionErrorMessage.value = 'Unable to Join. Invalid token.'
        break
      case ConnectionStatus.INVALID_VIDEO_ID:
        connectionErrorMessage.value = 'Invalid Youtube Video URL.'
        break
      default:
        connectionErrorMessage.value = ''
        break
    }
  })

  return { connectionStatus, connectionErrorMessage }
}

export function connectToSession(
  sessionController: SessionController,
  error: Ref<ConnectionStatus>
) {
  const connected = ref<boolean>(false)
  sessionController.connect().then((userTokenResponse: UserTokenResponse) => {
    if (userTokenResponse.content.status === ResponseStatus.SUCCESS) {
      connected.value = true
    } else {
      connected.value = false
      error.value = ConnectionStatus.INVALID_TOKEN
    }
  })
  return { connected }
}
