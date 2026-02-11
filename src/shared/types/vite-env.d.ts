/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
