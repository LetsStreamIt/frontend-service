import {
  MessageContent,
  NotificationMessage,
  TextMessage,
  Ack
} from '../../components/session/model/message'
import { Message } from '../../components/session/model/message'
import { io, Socket } from 'socket.io-client'
import {
  NotificationMessageDeserializer,
  TextMessageDeserializer
} from '../../components/session/model/presentation/deserialization/messageDeserializer'
import { VideoState } from '../../components/session/model/video'
import { VideoStateDeserializer } from '../../components/session/model/presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../../components/session/model/presentation/serialization/messageSerializer'

export interface VideoController {
  listenToVideoEvents(
    getVideoStateCallback: () => VideoState,
    synchVideoCallback: (videoState: VideoState) => void
  ): void
  playVideo(timestamp: number): Promise<void>
  stopVideo(timestamp: number): Promise<void>
}

export class VideoControllerImpl implements VideoController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  listenToVideoEvents(
    getVideoStateCallback: () => VideoState,
    synchVideoCallback: (videoState: VideoState) => void
  ): void {
    // Get synchronization messages
    this.socket.on('synchronize', (data) => {
      const videoState: VideoState = new VideoStateDeserializer().deserialize(JSON.parse(data))
      synchVideoCallback(videoState)
    })

    // Send video state, at request
    this.socket.on('videoState', (callback) => {
      callback(new SerializerImpl().serialize(getVideoStateCallback()))
    })
    console.log('ready!!!!')
  }

  playVideo(timestamp: number): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('playVideo', { timestamp: timestamp }, () => {
        resolve()
      })
    })
  }

  stopVideo(timestamp: number): Promise<void> {
    return new Promise((resolve) => {
      this.socket.emit('stopVideo', { timestamp: timestamp }, () => {
        resolve()
      })
    })
  }
}
