import { User } from '../user'

/**
 * Join Notification
 */
export enum JoinNotification {
  JOINROOM,
  LEAVEROOM
}

/**
 * Chat Notification Type
 */
export enum ChatMessageType {
  NOTIFICATION_MESSAGE = 'notificationMessage',
  TEXT_MESSAGE = 'textMessage'
}

/**
 * Message Content can either be a join notification or a string,
 * representing the message content
 */
export type MessageContent = JoinNotification | string

/**
 * Chat Message model
 */
export interface ChatMessage<X extends MessageContent> {
  readonly type: ChatMessageType
  readonly content: X
  readonly sender: User
}

/**
 * Notification Chat Message
 */
export class NotificationMessage implements ChatMessage<JoinNotification> {
  readonly content: JoinNotification
  readonly sender: User
  readonly type: ChatMessageType

  constructor(sender: User, notification: JoinNotification) {
    this.content = notification
    this.sender = sender
    this.type = ChatMessageType.NOTIFICATION_MESSAGE
  }
}

export class TextMessage implements ChatMessage<string> {
  readonly content: string
  readonly sender: User
  readonly type: ChatMessageType

  constructor(sender: User, text: string) {
    this.content = text
    this.sender = sender
    this.type = ChatMessageType.TEXT_MESSAGE
  }
}
