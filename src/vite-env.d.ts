/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUTH_URL: string
  readonly PROFILE_URL: string
  readonly YOUTUBE_API_KEY: string
  readonly VITE_PROFILE_SERVICE_HOSTNAME: string
  readonly VITE_PROFILE_SERVICE_PORT: string
  readonly VITE_AUTH_SERVICE_HOSTNAME: string
  readonly VITE_AUTH_SERVICE_PORT: string
  readonly VITE_SESSION_SERVICE_HOSTNAME: string
  readonly VITE_SESSION_SERVICE_PORT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
