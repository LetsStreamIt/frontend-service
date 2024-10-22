export enum PlayState {
  PAUSED = 'Paused',
  PLAYING = 'Playing'
}

export interface VideoState {
  timestamp: number
  state: PlayState
}

export type ProfileVideo = {
  id: string
  title: string
  thumbnail: string
  duration: string
  viewCount: number
  likeCount: number
}
