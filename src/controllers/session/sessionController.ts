import { io, Socket } from 'socket.io-client'
import { type IChatController, WSChatController } from '@/controllers/session/chatController'
import { type IVideoController, WSVideoController } from '@/controllers/session/videoController'
import {
  CreateSessionResponse,
  JoinSessionResponse,
  LeaveSessionResponse,
  UserTokenResponse
} from '@/model/session/command/response'
import { CommandType } from '@/model/session/command/command'

/**
 * Connection Status
 */
export enum ConnectionStatus {
  SUCCESS,
  CONNECTION_ERROR,
  SESSION_NOT_FOUND,
  USER_ALREADY_JOINED,
  INVALID_TOKEN,
  INVALID_VIDEO_ID,
  DISCONNECTED
}

/**
 * Session Controller interface
 * Manages communication with the Session Service.
 */
export interface ISessionController {
  readonly chatController: IChatController
  readonly videoController: IVideoController

  /**
   * Connects to the Session Service.
   * @returns User Token Response
   */
  connect(): Promise<UserTokenResponse>

  /**
   * Disconnects to the Session Service.
   */
  disconnect(): void

  /**
   * Sends a Create Session Command to the Session Service.
   * @param videoUrl Youtube Video URL
   * @returns Create Session Response
   */
  createSession(videoUrl: string): Promise<CreateSessionResponse>

  /**
   * Sends a Join Session Command to the Session Service.
   * @param sessionName Session name
   * @returns Join Session Response
   */
  joinSession(sessionName: string): Promise<JoinSessionResponse>

  /**
   * Sends a Leave Session Command to the Session Service.
   * @returns Leave Session Reponse
   */
  leaveSession(): Promise<LeaveSessionResponse>
}

/**
 * Session Controller Implementation.
 * It leverages a websocket to handle communcation.
 */
export class WsSessionController implements ISessionController {
  readonly socket: Socket
  readonly token: string
  readonly chatController: IChatController
  readonly videoController: IVideoController

  constructor(sessionServiceUrl: string, token: string) {
    this.socket = io({ path: sessionServiceUrl })
    this.token = token
    this.chatController = new WSChatController(this.socket)
    this.videoController = new WSVideoController(this.socket)
  }

  async connect(): Promise<UserTokenResponse> {
    return new Promise((resolve) => {
      this.connection().then(() => {
        this.sendUserToken().then((userTokenResponse: UserTokenResponse) =>
          resolve(userTokenResponse)
        )
      })
    })
  }

  disconnect(): void {
    this.socket.disconnect()
  }

  async createSession(videoUrl: string): Promise<CreateSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.CREATE_SESSION,
        { videoUrl: videoUrl },
        (createSessionResponse: CreateSessionResponse) => {
          resolve(createSessionResponse)
        }
      )
    })
  }

  async joinSession(sessionName: string): Promise<JoinSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.JOIN_SESSION,
        { sessionName: sessionName },
        (joinSessionResponse: JoinSessionResponse) => {
          this.listenToClientEvents()
          resolve(joinSessionResponse)
        }
      )
    })
  }

  leaveSession(): Promise<LeaveSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(CommandType.LEAVE_SESSION, (leaveSessionResponse: LeaveSessionResponse) => {
        this.disconnect()
        resolve(leaveSessionResponse)
      })
    })
  }

  private async connection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect()
      this.socket.on('connect', () => {
        resolve()
      })
      this.socket.on('error', () => {
        reject()
      })
    })
  }

  private async sendUserToken(): Promise<UserTokenResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.USER_TOKEN,
        { token: this.token },
        (userTokenResponse: UserTokenResponse) => {
          resolve(userTokenResponse)
        }
      )
    })
  }

  private listenToClientEvents() {
    window.addEventListener('beforeunload', () => {
      this.leaveSession()
    })
  }
}
