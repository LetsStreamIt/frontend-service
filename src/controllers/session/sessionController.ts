import { io, Socket } from 'socket.io-client'
import { Ack, CreateRoomAck } from '../../components/session/model/message'
import { ChatController } from './chatController'
import { ChatControllerImpl } from './chatController'
import { VideoController, VideoControllerImpl } from './videoController'

export enum ConnectionStatus {
  SUCCESS,
  CONNECTION_ERROR,
  JOIN_ERROR,
  INVALID_TOKEN,
  INVALID_VIDEO_ID
}

export interface SessionController {
  connectToSession(): Promise<ConnectionStatus>
  createRoom(room: string): Promise<string>
  joinRoom(room: string): Promise<ConnectionStatus>
  disconnectFromSession(): Promise<void>
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

  promise(promise: Promise<void>, f: () => void, g: () => void): void {
    promise.then(f).catch(g)
  }

  async connectToSession(): Promise<ConnectionStatus> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.connection(),
        () =>
          this.promise(
            this.sendUserToken(),
            () => resolve(ConnectionStatus.SUCCESS),
            () => reject(ConnectionStatus.INVALID_TOKEN)
          ),
        () => reject(ConnectionStatus.CONNECTION_ERROR)
      )
    })
  }

  async createRoom(room: string): Promise<string> {
    return new Promise((resolve, reject) => {
        this.sendCreateRoomMessage(room)
        .then((roomName) => resolve(roomName))
        .catch(() => reject())
    })
  }

  async joinRoom(room: string): Promise<ConnectionStatus> {
    return new Promise((resolve, reject) => {
      this.promise(
        this.sendJoinRoomMessage(room),
        () => {
          this.listenToClientEvents()
          resolve(ConnectionStatus.SUCCESS)
        },
        () => {
          console.log("ERRORRRR")
          reject(ConnectionStatus.JOIN_ERROR)
        }
      )
    })
  }

  disconnectFromSession(): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('leaveRoom')
      resolve()
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

  private async sendUserToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('userToken', { token: this.token }, (success) => {
        success == Ack.OK ? resolve() : reject()
      })
    })
  }

  private async sendJoinRoomMessage(room: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinRoom', { room: room }, (ack) => {
        console.log("ACKKKKK", ack)
        ack == Ack.OK ? resolve() : reject()
      })
    })
  }


  private async sendCreateRoomMessage(room: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('createRoom', { room: room }, (createRoomAck) => {
          createRoomAck.ack == Ack.OK ? resolve(createRoomAck.roomName) : reject()
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
