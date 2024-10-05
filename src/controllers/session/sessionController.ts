import { io, Socket } from 'socket.io-client'
import { Ack } from '../../components/session/model/message'
import { ChatController } from './chatController'
import { ChatControllerImpl } from './chatController'

export interface SessionController {
  connectToSession(): Promise<void>
  disconnectFromSession(): Promise<void>
  get getChatController(): ChatController
}

export class SessionControllerImpl implements SessionController {
  socket: Socket
  token: string
  room: string
  chatController: ChatController

  constructor(sessionServiceUrl: string, token: string, room: string) {
    this.socket = io(`${sessionServiceUrl}`, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })
    this.token = token
    this.room = room
    this.chatController = new ChatControllerImpl(this.socket)
  }

  // async connectToChat(
  //     recvMessageCallback: (message: Message<MessageContent>) => void

  async connectToSession(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection()
        .then(() => {
          this.joinRoom()
            .then(() => {
              this.listenToClientEvents()
              resolve()
              // this.listenToChatEvents(recvMessageCallback)
              //     .then(() => resolve())
              //     .catch(() => reject())
            })
            .catch(() => reject())
        })
        .catch(() => reject())
    })
  }

  disconnectFromSession(): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('leaveRoom')
      resolve()
    })
  }

  private async connection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect()
      this.socket.on('connect', () => {
        resolve()
      })
      this.socket.on('error', () => {
        reject()
      })
    })
  }

  private async joinRoom(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('userToken', { token: this.token }, (success) => {
        if (success === Ack.OK) {
          this.socket.emit('joinRoom', { room: this.room }, (ack) => {
            ack === Ack.OK ? resolve() : reject()
          })
        } else {
          reject()
        }
      })
    })
  }

  private listenToClientEvents() {
    window.addEventListener('beforeunload', () => {
      this.socket.emit('leaveRoom')
    })
  }

  get getChatController(): ChatController {
    return this.chatController
  }
}
