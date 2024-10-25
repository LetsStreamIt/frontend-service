import { Socket } from 'socket.io-client'
import { SendMessageResponse } from '@/model/command/response'
import { Message, MessageContent, TextMessage, NotificationMessage } from '@/model/message'
import { User, UserId } from '../../model/user'
import { CommandType } from '../../model/command/command'
import { ChatNotificationType } from '../../model/notification/notification'

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
        CommandType.SEND_MSG,
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
    this.socket.on(ChatNotificationType.TEXT_MESSAGE, (chatMessages) => {
      chatMessages.forEach((message) => {
        const sender: User = new User(new UserId(message.sender.id.email), message.sender.value)
        const textMessage: TextMessage = new TextMessage(sender, message.content)
        recvMessageCallback(textMessage)
      })
    })

    this.socket.on(ChatNotificationType.NOTIFICATION_MESSAGE, (message) => {
      const notificationMessage: NotificationMessage = new NotificationMessage(
        message.sender,
        message.content
      )
      recvMessageCallback(notificationMessage)
    })
  }
}
