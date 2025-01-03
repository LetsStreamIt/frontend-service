import { User } from '../user'
import { CommandType } from './command'

/**
 * Response
 */
export interface IResponse<X> {
  readonly command: CommandType
  readonly content: X
}

/**
 * Response Status
 */
export enum ResponseStatus {
  SUCCESS = 0,
  FAILURE = 1
}

/**
 * Join Session Response Type
 */
export enum JoinSessionResponseStatus {
  SUCCESS = 0,
  USER_ALREADY_JOINED = 1,
  SESSION_NOT_FOUND = 2
}

/**
 * Token Status
 */
export enum UserTokenResponseStatus {
  TOKEN_VALID = 0,
  TOKEN_INVALID = 1
}

/**
 * Create Session Response Content
 */
export class CreateSessionResponseContent {
  readonly status: ResponseStatus
  readonly sessionName: string

  constructor(status: ResponseStatus, sessionName: string) {
    this.status = status
    this.sessionName = sessionName
  }
}

/**
 * User Token Response Content.
 * It uses both ResponseStatus and UserTokenResponseStatus.
 * The purpose of the first one is to signal communication errors with the Authentication of User Service,
 * while the second one to inform if the token is valid or invalid.
 */
export class UserTokenResponseContent {
  readonly status: ResponseStatus
  readonly user?: User
  readonly tokenStatus: UserTokenResponseStatus

  constructor(status: ResponseStatus, tokenStatus: UserTokenResponseStatus, user?: User) {
    this.status = status
    this.user = user
    this.tokenStatus = tokenStatus
  }
}

/**
 * Join Session Response Content
 */
export class JoinSessionResponseContent {
  readonly status: JoinSessionResponseStatus
  readonly videoId: string

  constructor(status: JoinSessionResponseStatus, videoId: string) {
    this.status = status
    this.videoId = videoId
  }
}

/**
 * Join Session Response
 */
export class JoinSessionResponse implements IResponse<JoinSessionResponseContent> {
  readonly command: CommandType
  readonly content: JoinSessionResponseContent

  constructor(content: JoinSessionResponseContent) {
    this.command = CommandType.JOIN_SESSION
    this.content = content
  }
}

/**
 * Create Session Response
 */
export class CreateSessionResponse implements IResponse<CreateSessionResponseContent> {
  readonly command: CommandType
  readonly content: CreateSessionResponseContent

  constructor(status: ResponseStatus, sessionName: string) {
    this.command = CommandType.CREATE_SESSION
    this.content = new CreateSessionResponseContent(status, sessionName)
  }
}

/**
 * Play Video Response
 */
export class PlayVideoResponse implements IResponse<ResponseStatus> {
  readonly command: CommandType
  readonly content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.PLAY_VIDEO
    this.content = content
  }
}

/**
 * Stop Video Reponse
 */
export class StopVideoResponse implements IResponse<ResponseStatus> {
  readonly command: CommandType
  readonly content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.STOP_VIDEO
    this.content = content
  }
}

/**
 * Send Message Response
 */
export class SendMessageResponse implements IResponse<ResponseStatus> {
  readonly command: CommandType
  readonly content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.SEND_MSG
    this.content = content
  }
}

/**
 * User Token Response
 */
export class UserTokenResponse implements IResponse<UserTokenResponseContent> {
  readonly command: CommandType
  readonly content: UserTokenResponseContent

  constructor(status: ResponseStatus, tokenStatus: UserTokenResponseStatus, user?: User) {
    this.command = CommandType.USER_TOKEN
    this.content = new UserTokenResponseContent(status, tokenStatus, user)
  }
}

/**
 * Leave Session Response
 */
export class LeaveSessionResponse implements IResponse<ResponseStatus> {
  readonly command: CommandType
  readonly content: ResponseStatus

  constructor(content: ResponseStatus) {
    this.command = CommandType.LEAVE_SESSION
    this.content = content
  }
}
