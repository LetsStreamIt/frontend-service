import { Socket } from 'socket.io-client'
import { PlayVideoResponse, StopVideoResponse } from '@/model/command/response'
import { VideoState } from '@/model/video'
import { VideoNotificationType } from '@/model/notification/notification'
import { CommandType } from '@/model/command/command'

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
    this.socket.on(VideoNotificationType.SYNCHRONIZE, (videoState: VideoState) => {
      synchVideoCallback(videoState)
    })

    // Send video state, at request
    this.socket.on(VideoNotificationType.VIDEO_STATE, (callback) => {
      getVideoStateCallback().then((videoState: VideoState) => {
        callback(videoState)
      })
    })
  }

  playVideo(timestamp: number): Promise<PlayVideoResponse> {
    return new Promise((resolve) => {
      this.socket.emit(
        CommandType.PLAY_VIDEO,
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
        CommandType.STOP_VIDEO,
        { timestamp: timestamp },
        (StopVideoResponse: StopVideoResponse) => {
          resolve(StopVideoResponse)
        }
      )
    })
  }
}
