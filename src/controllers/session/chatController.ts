import {
  MessageContent,
  NotificationMessage,
  TextMessage,
  Ack
} from '../../components/session/model/message'
import { Message } from '../../components/session/model/message'
import { io, Socket } from 'socket.io-client'
import {
  NotificationMessageDeserializer,
  TextMessageDeserializer
} from '../../components/session/model/presentation/deserialization/messageDeserializer'

export interface ChatController {
  listenToChatEvents(recvMessageCallback: (message: Message<MessageContent>) => void): Promise<void>
  sendMessage(message: string): Promise<void>
}

export class ChatControllerImpl implements ChatController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  async sendMessage(message: string): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('sendMessage', { message: message }, () => {
        resolve()
      })
    })
  }

  async listenToChatEvents(
    recvMessageCallback: (message: Message<MessageContent>) => void
  ): Promise<void> {
    this.socket.on('textMessage', (data) => {
      data = JSON.parse(data)
      data.forEach((textMessage) => {
        const message: TextMessage = new TextMessageDeserializer().deserialize(textMessage)
        recvMessageCallback(message)
      })
    })

    this.socket.on('notificationMessage', (data) => {
      const notificationMessage: NotificationMessage =
        new NotificationMessageDeserializer().deserialize(JSON.parse(data))
      recvMessageCallback(notificationMessage)
    })
  }
}
