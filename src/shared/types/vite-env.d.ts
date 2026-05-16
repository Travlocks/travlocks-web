/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_NAVER_CLIENT_ID: string;
  /** 카카오 로그인(동의 화면)용 REST API 키 — 미설정 시 카카오 버튼은 토스트 안내만 */
  readonly VITE_KAKAO_LOGIN_REST_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
