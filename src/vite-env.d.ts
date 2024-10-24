/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AUTH_URL: string
  readonly PROFILE_URL: string
  readonly YOUTUBE_API_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
