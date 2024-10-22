import { Socket } from 'socket.io-client'
import { SendMessageResponse } from '@/model/command/response'
import { Message, MessageContent, TextMessage, NotificationMessage } from '@/model/message'
import { User } from '../../model/user'

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
      this.socket.emit(
        'sendMessage',
        { message: message },
        (SendMessageResponse: SendMessageResponse) => {
          resolve(SendMessageResponse)
        }
      )
    })
  }

  async handleChatMessages(
    recvMessageCallback: (message: Message<MessageContent>) => void
  ): Promise<void> {
    this.socket.on('textMessage', (chatMessages) => {
      chatMessages.forEach((message) => {
        const sender: User = new User(
          message.sender.id,
          message.sender.value.x,
          message.sender.value.y
        )
        const textMessage: TextMessage = new TextMessage(sender, message.content)
        recvMessageCallback(textMessage)
      })
    })

    this.socket.on('notificationMessage', (message) => {
      const notificationMessage: NotificationMessage = new NotificationMessage(
        message.sender,
        message.content
      )
      recvMessageCallback(notificationMessage)
    })
  }
}
