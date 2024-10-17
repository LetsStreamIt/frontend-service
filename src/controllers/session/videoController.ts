import { Socket } from 'socket.io-client'
import { VideoState } from '../../components/session/model/video'
import { VideoStateDeserializer } from '../../components/session/model/presentation/deserialization/videoStateDeserializer'
import { SerializerImpl } from '../../components/session/model/presentation/serialization/messageSerializer'
import { PlayVideoResponse, StopVideoResponse } from './ack'

export interface VideoController {
  handleVideoNotifications(
    getVideoStateCallback: () => Promise<VideoState>,
    synchVideoCallback: (videoState: VideoState) => Promise<void>
  ): void
  playVideo(timestamp: number): Promise<PlayVideoResponse>
  stopVideo(timestamp: number): Promise<StopVideoResponse>
}

export class VideoControllerImpl implements VideoController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  handleVideoNotifications(
    getVideoStateCallback: () => Promise<VideoState>,
    synchVideoCallback: (videoState: VideoState) => void
  ): void {
    // Get synchronization messages
    this.socket.on('synchronize', (data) => {
      const videoState: VideoState = new VideoStateDeserializer().deserialize(JSON.parse(data))
      synchVideoCallback(videoState)
    })

    // Send video state, at request
    this.socket.on('videoState', (callback) => {
      getVideoStateCallback().then((videoState: VideoState) => {
        callback(new SerializerImpl().serialize(videoState))
      })
    })
  }

  playVideo(timestamp: number): Promise<PlayVideoResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        'playVideo',
        { timestamp: timestamp },
        (PlayVideoResponse: PlayVideoResponse) => {
          resolve(PlayVideoResponse)
        }
      )
    })
  }

  stopVideo(timestamp: number): Promise<StopVideoResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        'stopVideo',
        { timestamp: timestamp },
        (StopVideoResponse: StopVideoResponse) => {
          resolve(StopVideoResponse)
        }
      )
    })
  }
}
