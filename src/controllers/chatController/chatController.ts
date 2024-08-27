import { io, Socket } from 'socket.io-client'
import { NotificationMessage, TextMessage } from '../../components/session/model/message'
import {
  NotificationMessageDeserializer,
  TextMessageDeserializer
} from '../../components/session/model/presentation/deserialization/messageDeserializer'

export enum Ack {
  OK,
  FAILURE
}

export interface ChatController {
  connectToChat(
    textMessageCallback: (message: TextMessage) => void,
    notificationCallback: (message: NotificationMessage) => void
  ): Promise<void>
  sendMessage(message: string): void
}

export class ChatControllerImpl implements ChatController {
  socket: Socket
  token: string
  room: string

  constructor(sessionServiceUrl: string, token: string, room: string) {
    this.socket = io(`${sessionServiceUrl}/chat`, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })
    this.token = token
    this.room = room
  }

  async connectToChat(
    textMessageCallback: (message: TextMessage) => void,
    notificationCallback: (message: NotificationMessage) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection()
        .then(() => {
          this.joinRoom()
            .then(() => {
              this.listenToClientEvents()
              this.listenToChatEvents(textMessageCallback, notificationCallback)
                .then(() => resolve())
                .catch(() => reject())
              console.log('done')
            })
            .catch(() => reject())
        })
        .catch(() => reject())
    })
  }

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', { message: message }, () => {})
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

  private async listenToChatEvents(
    textMessageCallback: (message: TextMessage) => void,
    notificationCallback: (message: NotificationMessage) => void
  ): Promise<void> {
    this.socket.on('textMessage', (data) => {
      const message: TextMessage = new TextMessageDeserializer().deserialize(JSON.parse(data))
      textMessageCallback(message)
    })

    this.socket.on('chatUpdate', (data) => {
      JSON.parse(data).forEach((element) => {
        const message: TextMessage = new TextMessageDeserializer().deserialize(element)
        textMessageCallback(message)
      })
    })

    this.socket.on('notificationMessage', (data) => {
      const notificationMessage: NotificationMessage =
        new NotificationMessageDeserializer().deserialize(JSON.parse(data))
      notificationCallback(notificationMessage)
    })
  }
}
