// OAuth 리다이렉트 URL
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';

// 랜덤 문자열 생성 (nonce, state)
const generateRandomString = (length = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(36).padStart(2, '0'))
    .join('')
    .slice(0, length);
};

// google OAuth url 생성
export const getGoogleOAuthUrl = (): string => {
  const nonce = generateRandomString();
  // csrf 검증을 위해 sessionStorage에 저장
  sessionStorage.setItem('google_nonce', nonce);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/google/callback`,
    response_type: 'id_token',
    scope: 'openid email profile',
    nonce,
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

// naver OAuth url 생성
export const getNaverOAuthUrl = (): string => {
  const state = generateRandomString();
  // csrf 검증을 위해 sessionStorage에 저장
  sessionStorage.setItem('naver_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
    redirect_uri: `${window.location.origin}/naver/callback`,
    state,
  });

  return `${NAVER_AUTH_URL}?${params.toString()}`;
};

// Kakao 로그인 OAuth URL (카카오 개발자 콘솔 REST API 키, 미설정 시 null)
export const getKakaoOAuthUrl = (): string | null => {
  const clientId = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY as string | undefined;
  if (!clientId) return null;

  const state = generateRandomString();
  sessionStorage.setItem('kakao_oauth_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: `${window.location.origin}/kakao/callback`,
    state,
  });

  return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
};
