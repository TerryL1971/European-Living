/// <reference types="node" />

interface ImportMetaEnv {
  VITE_SANITY_PROJECT_ID: string
  VITE_SANITY_DATASET: string
  VITE_SANITY_API_VERSION: string
  VITE_SANITY_USE_CDN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
