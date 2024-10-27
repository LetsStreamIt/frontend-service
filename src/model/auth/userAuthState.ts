/**
 * User Auth State contains local User information concerning authentication.
 */
export interface UserAuthState {
  id: string
  email: string
  accessToken: string
  refreshToken: string
}
