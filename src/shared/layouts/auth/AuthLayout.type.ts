// 인증 관련 페이지 헤더 타입
export type AuthLayoutHeader = {
  subtitle?: string;
  description?: string;
  showAuthNav?: boolean;
  buttonText?: string;
  /** 로고(워드마크) 최대 너비(px). 미지정 시 367 */
  wordmarkMaxWidthPx?: number;
};

// 인증 관련 페이지 컨텍스트 타입
export type AuthLayoutOutletCtx = {
  header: AuthLayoutHeader;
  // 헤더 교체 함수
  setAuthHeader: (next: AuthLayoutHeader) => void;
  // 일부만 변경
  updateAuthHeader: (update: Partial<AuthLayoutHeader>) => void;
  // 헤더 초기화 함수
  resetAuthHeader: () => void;
};
