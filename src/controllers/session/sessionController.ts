import { io, Socket } from 'socket.io-client'
import { Ack, CreateRoomAck } from '../../components/session/model/message'
import { ChatController } from './chatController'
import { ChatControllerImpl } from './chatController'
import { VideoController, VideoControllerImpl } from './videoController'
import { CreateSessionAck, JoinSessionAck, LeaveSessionAck, UserTokenAck } from './ack'

export enum ConnectionStatus {
  SUCCESS,
  CONNECTION_ERROR,
  JOIN_ERROR,
  INVALID_TOKEN,
  INVALID_VIDEO_ID
}

export interface SessionController {
  connect(): Promise<UserTokenAck>
  createSession(videoId: string): Promise<CreateSessionAck>
  joinSession(sessionName: string): Promise<JoinSessionAck>
  disconnectFromSession(): Promise<LeaveSessionAck>

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

  async connect(): Promise<UserTokenAck> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.connection(),
        () =>
          this.promise(
            this.sendUserToken(),
            (userTokenAck: UserTokenAck) => resolve(userTokenAck),
            () => reject()
          ),
        () => reject()
      )
    })
  }

  async createSession(videoId: string): Promise<CreateSessionAck> {
    return new Promise((resolve, reject) => {
      this.sendCreateSessionMessage(videoId)
        .then((createSessionAck: CreateSessionAck) => resolve(createSessionAck))
        .catch(() => reject())
    })
  }

  async joinSession(sessionName: string): Promise<JoinSessionAck> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.sendJoinSessionMessage(sessionName),
        (joinSessionAck: JoinSessionAck) => {
          this.listenToClientEvents()
          resolve(joinSessionAck)
        },
        () => reject()
      )
    })
  }

  disconnectFromSession(): Promise<LeaveSessionAck> {
    return new Promise((resolve) => {
      this.socket.emit('leaveRoom', null, (leaveSessionAck: LeaveSessionAck) => {
        resolve(leaveSessionAck)
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

  private async sendUserToken(): Promise<UserTokenAck> {
    return new Promise((resolve) => {
      this.socket.emit('userToken', { token: this.token }, (userTokenAck: UserTokenAck) => {
        resolve(userTokenAck)
      })
    })
  }

  private async sendJoinSessionMessage(room: string): Promise<JoinSessionAck> {
    return new Promise((resolve) => {
      this.socket.emit('joinRoom', { room: room }, (joinSessionAck: JoinSessionAck) => {
        resolve(joinSessionAck)
      })
    })
  }

  private async sendCreateSessionMessage(videoId: string): Promise<CreateSessionAck> {
    return new Promise((resolve) => {
      this.socket.emit('createRoom', { room: videoId }, (createSessionAck: CreateSessionAck) => {
        resolve(createSessionAck)
      })
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
