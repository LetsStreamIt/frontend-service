import { Socket } from 'socket.io-client'
import { VideoState } from '../../components/session/model/video'
import { VideoStateDeserializer } from '../../components/session/model/presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../../components/session/model/presentation/serialization/messageSerializer'
import { PlayVideoAck, StopVideoAck } from './ack'

export interface VideoController {
  handleVideoNotifications(
    getVideoStateCallback: () => VideoState,
    synchVideoCallback: (videoState: VideoState) => void
  ): void
  playVideo(timestamp: number): Promise<PlayVideoAck>
  stopVideo(timestamp: number): Promise<StopVideoAck>
}

export class VideoControllerImpl implements VideoController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  handleVideoNotifications(
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
  }

  playVideo(timestamp: number): Promise<PlayVideoAck> {
    return new Promise((resolve) => {
      this.socket.emit('playVideo', { timestamp: timestamp }, (playVideoAck: PlayVideoAck) => {
        resolve(playVideoAck)
      })
    })
  }

  stopVideo(timestamp: number): Promise<StopVideoAck> {
    return new Promise((resolve) => {
      this.socket.emit('stopVideo', { timestamp: timestamp }, (stopVideoAck: StopVideoAck) => {
        resolve(stopVideoAck)
      })
    })
  }
}
