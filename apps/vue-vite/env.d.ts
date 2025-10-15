/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT?: string
  readonly VITE_API_PORT?: string
  readonly VITE_DEFAULT_USER_EMAIL?: string
  readonly VITE_DEFAULT_USER_PASSWORD?: string
}

interface ImportMeta {
  readonly env?: ImportMetaEnv
}
