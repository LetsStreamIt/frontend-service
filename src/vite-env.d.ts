/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUTH_URL: string
  readonly PROFILE_URL: string
  readonly YOUTUBE_API_KEY: string
  readonly PROFILE_SERVICE_HOSTNAME: string
  readonly PROFILE_SERVICE_PORT: string
  readonly AUTH_SERVICE_HOSTNAME: string
  readonly AUTH_SERVICE_PORT: string
  readonly SESSION_SERVICE_HOSTNAME: string
  readonly SESSION_SERVICE_PORT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
