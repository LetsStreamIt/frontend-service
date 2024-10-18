export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}
