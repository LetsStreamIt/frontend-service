import { io, Socket } from 'socket.io-client'
import { ChatController } from './chatController'
import { ChatControllerImpl } from './chatController'
import { VideoController, VideoControllerImpl } from './videoController'
import {
  CreateSessionResponse,
  JoinSessionResponse,
  LeaveSessionResponse,
  UserTokenResponse
} from '../../model/command/response'
import { CommandType } from '../../model/command/command'

export enum ConnectionStatus {
  SUCCESS,
  CONNECTION_ERROR,
  SESSION_NOT_FOUND,
  USER_ALREADY_JOINED,
  INVALID_TOKEN,
  INVALID_VIDEO_ID,
  DISCONNECTED
}

export interface SessionController {
  connect(): Promise<UserTokenResponse>
  disconnect(): void
  createSession(videoId: string): Promise<CreateSessionResponse>
  joinSession(sessionName: string): Promise<JoinSessionResponse>
  leaveSession(): Promise<LeaveSessionResponse>

  get getChatController(): ChatController
  get getVideoController(): VideoController
}

export class SessionControllerImpl implements SessionController {
  socket: Socket
  token: string
  chatController: ChatController
  videoController: VideoController

  constructor(sessionServiceUrl: string, token: string) {
    this.socket = io(`${sessionServiceUrl}`, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })

    this.token = token
    this.chatController = new ChatControllerImpl(this.socket)
    this.videoController = new VideoControllerImpl(this.socket)
  }

  promise<X>(promise: Promise<X>, f: (commandAck: X) => void, g: () => void): void {
    promise.then(f).catch(g)
  }

  async connect(): Promise<UserTokenResponse> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.connection(),
        () =>
          this.promise(
            this.sendUserToken(),
            (userTokenResponse: UserTokenResponse) => resolve(userTokenResponse),
            () => reject()
          ),
        () => reject()
      )
    })
  }

  disconnect(): void {
    this.socket.disconnect()
  }

  async createSession(videoId: string): Promise<CreateSessionResponse> {
    return new Promise((resolve, reject) => {
      this.sendCreateSessionMessage(videoId)
        .then((createSessionResponse: CreateSessionResponse) => resolve(createSessionResponse))
        .catch(() => reject())
    })
  }

  async joinSession(sessionName: string): Promise<JoinSessionResponse> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.sendJoinSessionMessage(sessionName),
        (joinSessionResponse: JoinSessionResponse) => {
          this.listenToClientEvents()
          resolve(joinSessionResponse)
        },
        () => reject()
      )
    })
  }

  leaveSession(): Promise<LeaveSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.LEAVE_SESSION,
        null,
        (leaveSessionResponse: LeaveSessionResponse) => {
          this.disconnect()
          resolve(leaveSessionResponse)
        }
      )
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

  private async sendJoinSessionMessage(sessionName: string): Promise<JoinSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.JOIN_SESSION,
        { sessionName: sessionName },
        (joinSessionResponse: JoinSessionResponse) => {
          resolve(joinSessionResponse)
        }
      )
    })
  }

  private async sendCreateSessionMessage(videoUrl: string): Promise<CreateSessionResponse> {
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

  private listenToClientEvents() {
    window.addEventListener('beforeunload', () => {
      this.leaveSession()
    })
  }

  get getChatController(): ChatController {
    return this.chatController
  }

  get getVideoController(): VideoController {
    return this.videoController
  }
}
