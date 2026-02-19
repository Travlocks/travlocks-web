import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLoginCallback } from '@/feature/auth/login/hooks/useSocialLoginCallback';

/**
 * Google OAuth 콜백 페이지
 *
 * @description
 * Google OAuth implicit flow에서 id_token을 URL hash에서 추출하여
 * 백엔드 API로 전송합니다.
 *
 * URL 형태: /google/callback#id_token=...&token_type=Bearer&...
 */
const GoogleCallbackPage = () => {
  const navigate = useNavigate();
  const { mutate: googleLogin } = useGoogleLoginCallback({
    onSuccess: (data) => {
      console.log('googleLogin success', data);
    },
    onError: (error, errorMessage) => {
      console.error(error.response?.data, errorMessage);
      alert(errorMessage);
      navigate('/login', { replace: true });
      return;
    },
  });
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    // url hash에서 id_token 추출
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const idToken = params.get('id_token');

    if (!idToken) {
      console.error('Google 콜백: id_token이 없습니다.');
      navigate('/login', { replace: true });
      return;
    }

    googleLogin({ idToken });
  }, [googleLogin, navigate]);

  return null;
};

export default GoogleCallbackPage;
