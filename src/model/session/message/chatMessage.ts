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
  readonly content: X
  readonly sender: User

  get getContent(): X

  get getSender(): User
}

/**
 * Notification Chat Message
 */
export class NotificationMessage implements ChatMessage<JoinNotification> {
  content: JoinNotification
  sender: User
  type: ChatMessageType

  constructor(sender: User, notification: JoinNotification) {
    this.content = notification
    this.sender = sender
    this.type = ChatMessageType.NOTIFICATION_MESSAGE
  }

  get getContent(): JoinNotification {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}

export class TextMessage implements ChatMessage<string> {
  content: string
  sender: User
  type: ChatMessageType

  constructor(sender: User, text: string) {
    this.content = text
    this.sender = sender
    this.type = ChatMessageType.TEXT_MESSAGE
  }

  get getContent(): string {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}
