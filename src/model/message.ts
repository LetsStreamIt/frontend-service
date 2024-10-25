import { User } from './user'

export enum Notification {
  JOINROOM,
  LEAVEROOM
}

export enum MessageType {
  NOTIFICATION_MSG = 'notificationMessage',
  TEXT_MSG = 'textMessage'
}

export type MessageContent = Notification | string

export interface Message<X extends MessageContent> {
  readonly content: X
  readonly sender: User

  get getContent(): X

  get getSender(): User
}

export class NotificationMessage implements Message<Notification> {
  content: Notification
  sender: User
  type: MessageType

  constructor(sender: User, notification: Notification) {
    this.content = notification
    this.sender = sender
    this.type = MessageType.NOTIFICATION_MSG
  }

  get getContent(): Notification {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}

export class TextMessage implements Message<string> {
  content: string
  sender: User
  type: MessageType

  constructor(sender: User, text: string) {
    this.content = text
    this.sender = sender
    this.type = MessageType.NOTIFICATION_MSG
  }

  get getContent(): string {
    return this.content
  }

  get getSender(): User {
    return this.sender
  }
}
