/**
 * Video Notification Type
 */
export enum VideoMessageType {
  VIDEO_STATE = 'videoState',
  SYNCHRONIZE = 'synchronize'
}

/**
 * Play State
 */
export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

/**
 * Video State
 */
export interface IVideoState {
  timestamp: number
  state: PlayState
}
