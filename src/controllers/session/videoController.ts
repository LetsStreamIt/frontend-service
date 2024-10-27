import { Socket } from 'socket.io-client'
import type { PlayVideoResponse, StopVideoResponse } from '@/model/session/command/response'
import { type IVideoState, VideoMessageType } from '@/model/session/message/videoMessage'
import { CommandType } from '@/model/session/command/command'

/**
 * Video Controller interface.
 * Manages communication with the Session Video.
 */
export interface IVideoController {
  /**
   * Handles Video messages.
   * Executes the provided callbacks when a new message is received, based on its type.
   * @param getVideoStateCallback the function should return the state video
   * @param synchVideoCallback the function should synchronize the local video, given a video state
   */
  handleVideoNotifications(
    getVideoStateCallback: () => Promise<IVideoState>,
    synchVideoCallback: (videoState: IVideoState) => void
  ): void

  /**
   * Sends a Play Video Command to the Session Service
   * @param timestamp Timestamp of the Video
   * @returns Play Video Response
   */
  playVideo(timestamp: number): Promise<PlayVideoResponse>

  /**
   * Sends a Stop Video Command to the Session Service
   * @param timestamp Timestamp of the Video
   * @returns Stop Video Response
   */
  stopVideo(timestamp: number): Promise<StopVideoResponse>
}

export class VideoController implements IVideoController {
  socket: Socket

  constructor(socket: Socket) {
    this.socket = socket
  }

  handleVideoNotifications(
    getVideoStateCallback: () => Promise<IVideoState>,
    synchVideoCallback: (videoState: IVideoState) => void
  ): void {
    // Get synchronization messages
    this.socket.on(VideoMessageType.SYNCHRONIZE, (videoState: IVideoState) => {
      synchVideoCallback(videoState)
    })

    // Send video state, at request
    this.socket.on(VideoMessageType.VIDEO_STATE, (callback: (videoState: IVideoState) => void) => {
      getVideoStateCallback().then((videoState: IVideoState) => {
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
