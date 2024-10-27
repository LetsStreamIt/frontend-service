import { Socket } from 'socket.io-client'
import { SendMessageResponse } from '@/model/session/command/response'
import {
  type ChatMessage,
  type MessageContent,
  TextMessage,
  NotificationMessage
} from '@/model/session/message/chatMessage'
import { User, UserId } from '@/model/session/user'
import { CommandType } from '@/model/session/command/command'
import { ChatMessageType } from '@/model/session/message/chatMessage'

/**
 * Chat Controller interface.
 * Manages communication with the Session Chat.
 */
export interface IChatController {
  /**
   * Handles Chat messages.
   * Executes the callback provided as parameter when a new message is received.
   * @param chatMessageReceivedCallback
   */
  handleChatMessages(
    chatMessageReceivedCallback: (message: ChatMessage<MessageContent>) => void
  ): void

  /**
   * Sends a message to the Session Chat.
   * @param message ChatMessage to send
   * @returns Response from the Session Service
   */
  sendMessage(message: string): Promise<SendMessageResponse>
}

export class ChatController implements IChatController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  async sendMessage(message: string): Promise<SendMessageResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.SEND_MSG,
        { message: message },
        (sendMessageResponse: SendMessageResponse) => {
          resolve(sendMessageResponse)
        }
      )
    })
  }

  async handleChatMessages(
    chatMessageReceivedCallback: (message: ChatMessage<MessageContent>) => void
  ) {
    // Separately handle Text and Notification Messages.
    this.socket.on(ChatMessageType.TEXT_MESSAGE, (chatMessages) => {
      chatMessages.forEach((message) => {
        const sender: User = new User(new UserId(message.sender.id.email), message.sender.value)
        const textMessage: TextMessage = new TextMessage(sender, message.content)
        chatMessageReceivedCallback(textMessage)
      })
    })

    this.socket.on(ChatMessageType.NOTIFICATION_MESSAGE, (message) => {
      const notificationMessage: NotificationMessage = new NotificationMessage(
        message.sender,
        message.content
      )
      chatMessageReceivedCallback(notificationMessage)
    })
  }
}
