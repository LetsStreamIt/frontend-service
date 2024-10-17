import {
  MessageContent,
  NotificationMessage,
  TextMessage} from '../../components/session/model/message'
import { Message } from '../../components/session/model/message'
import { Socket } from 'socket.io-client'
import {
  NotificationMessageDeserializer,
  TextMessageDeserializer
} from '../../components/session/model/presentation/deserialization/messageDeserializer'
import { SendMessageResponse } from './ack'

export interface ChatController {
  handleChatMessages(recvMessageCallback: (message: Message<MessageContent>) => void): Promise<void>
  sendMessage(message: string): Promise<SendMessageResponse>
}

export class ChatControllerImpl implements ChatController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  async sendMessage(message: string): Promise<SendMessageResponse> {
    return new Promise((resolve) => {
      this.socket.emit('sendMessage', { message: message }, (SendMessageResponse: SendMessageResponse) => {
        resolve(SendMessageResponse)
      })
    })
  }

  async handleChatMessages(
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
