export enum CommandType {
  CONNECTION = 'connection',
  USER_TOKEN = 'userToken',
  DISCONNECT = 'disconnect',
  CREATE_ROOM = 'createRoom',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  SEND_MSG = 'sendMessage',
  STOP_VIDEO = 'stopVideo',
  PLAY_VIDEO = 'playVideo'
}

export interface SessionCommand {
  type: CommandType
  token: string
}

export interface CommandAck<X> {
  command: CommandType
  content: X
}

export enum Ack {
  SUCCESS = 0,
  FAILURE = 1
}

export enum JoinSessionAckContent {
  SUCCESS = 0,
  USER_ALREADY_JOINED = 1,
  SESSION_NOT_FOUND = 2
}

class CreateSessionContent {
  ack: Ack
  sessionName: string

  constructor(ack: Ack, sessionName: string) {
    this.ack = ack
    this.sessionName = sessionName
  }
}

export class JoinSessionAck implements CommandAck<JoinSessionAckContent> {
  command: CommandType
  content: JoinSessionAckContent

  constructor(content: JoinSessionAckContent) {
    this.command = CommandType.JOIN_ROOM
    this.content = content
  }
}

export class CreateSessionAck implements CommandAck<CreateSessionContent> {
  command: CommandType
  content: CreateSessionContent

  constructor(ack: Ack, sessionName: string) {
    this.command = CommandType.CREATE_ROOM
    this.content = new CreateSessionContent(ack, sessionName)
  }
}

export class PlayVideoAck implements CommandAck<Ack> {
  command: CommandType
  content: Ack

  constructor(content: Ack) {
    this.command = CommandType.PLAY_VIDEO
    this.content = content
  }
}

export class StopVideoAck implements CommandAck<Ack> {
  command: CommandType
  content: Ack

  constructor(content: Ack) {
    this.command = CommandType.STOP_VIDEO
    this.content = content
  }
}

export class SendMessageAck implements CommandAck<Ack> {
  command: CommandType
  content: Ack

  constructor(content: Ack) {
    this.command = CommandType.SEND_MSG
    this.content = content
  }
}

export class UserTokenAck implements CommandAck<Ack> {
  command: CommandType
  content: Ack

  constructor(content: Ack) {
    this.command = CommandType.USER_TOKEN
    this.content = content
  }
}

export class LeaveSessionAck implements CommandAck<Ack> {
  command: CommandType
  content: Ack

  constructor(content: Ack) {
    this.command = CommandType.LEAVE_ROOM
    this.content = content
  }
}
