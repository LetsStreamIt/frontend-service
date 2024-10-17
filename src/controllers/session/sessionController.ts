import { io, Socket } from 'socket.io-client'
import { ChatController } from './chatController'
import { ChatControllerImpl } from './chatController'
import { VideoController, VideoControllerImpl } from './videoController'
import {
  CreateSessionResponse,
  JoinSessionResponse,
  LeaveSessionResponse,
  UserTokenResponse
} from './ack'

export enum ConnectionStatus {
  SUCCESS,
  CONNECTION_ERROR,
  SESSION_NOT_FOUND,
  USER_ALREADY_JOINED,
  INVALID_TOKEN,
  INVALID_VIDEO_ID
}

export interface SessionController {
  connect(): Promise<UserTokenResponse>
  createSession(videoId: string): Promise<CreateSessionResponse>
  joinSession(sessionName: string): Promise<JoinSessionResponse>
  disconnectFromSession(): Promise<LeaveSessionResponse>

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
            (UserTokenResponse: UserTokenResponse) => resolve(UserTokenResponse),
            () => reject()
          ),
        () => reject()
      )
    })
  }

  async createSession(videoId: string): Promise<CreateSessionResponse> {
    return new Promise((resolve, reject) => {
      this.sendCreateSessionMessage(videoId)
        .then((CreateSessionResponse: CreateSessionResponse) => resolve(CreateSessionResponse))
        .catch(() => reject())
    })
  }

  async joinSession(sessionName: string): Promise<JoinSessionResponse> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.sendJoinSessionMessage(sessionName),
        (JoinSessionResponse: JoinSessionResponse) => {
          this.listenToClientEvents()
          resolve(JoinSessionResponse)
        },
        () => reject()
      )
    })
  }

  disconnectFromSession(): Promise<LeaveSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit('leaveRoom', null, (LeaveSessionResponse: LeaveSessionResponse) => {
        resolve(LeaveSessionResponse)
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
        'userToken',
        { token: this.token },
        (UserTokenResponse: UserTokenResponse) => {
          console.log('TOJENNNNNNN', UserTokenResponse)
          resolve(UserTokenResponse)
        }
      )
    })
  }

  private async sendJoinSessionMessage(room: string): Promise<JoinSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit('joinRoom', { room: room }, (JoinSessionResponse: JoinSessionResponse) => {
        resolve(JoinSessionResponse)
      })
    })
  }

  private async sendCreateSessionMessage(videoId: string): Promise<CreateSessionResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        'createRoom',
        { room: videoId },
        (CreateSessionResponse: CreateSessionResponse) => {
          resolve(CreateSessionResponse)
        }
      )
    })
  }

  private listenToClientEvents() {
    window.addEventListener('beforeunload', () => {
      this.socket.emit('leaveRoom')
    })
  }

  get getChatController(): ChatController {
    return this.chatController
  }

  get getVideoController(): VideoController {
    return this.videoController
  }
}
