interface ServiceConfig {
  PROFILE_SERVICE_HOSTNAME: string
  PROFILE_SERVICE_PORT: string
  AUTH_SERVICE_HOSTNAME: string
  AUTH_SERVICE_PORT: string
  SESSION_SERVICE_HOSTNAME: string
  SESSION_SERVICE_PORT: string
}

export const standardConfig: ServiceConfig = {
  PROFILE_SERVICE_HOSTNAME: import.meta.env.PROFILE_SERVICE_HOSTNAME || 'localhost',
  PROFILE_SERVICE_PORT: import.meta.env.PROFILE_SERVICE_PORT || '8080',
  AUTH_SERVICE_HOSTNAME: import.meta.env.AUTH_SERVICE_HOSTNAME || 'localhost',
  AUTH_SERVICE_PORT: import.meta.env.AUTH_SERVICE_PORT || '3000',
  SESSION_SERVICE_HOSTNAME: import.meta.env.SESSION_SERVICE_HOSTNAME || 'localhost',
  SESSION_SERVICE_PORT: import.meta.env.SESSION_SERVICE_PORT || '4000'
}
