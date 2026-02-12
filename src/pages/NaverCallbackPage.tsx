import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNaverLoginCallback } from '@/feature/auth/login/hooks/useSocialLoginCallback';

const NaverCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutate: naverLogin } = useNaverLoginCallback();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      console.error('Naver 콜백: code 또는 state가 없습니다.');
      navigate('/login', { replace: true });
      return;
    }

    // csrf 검증: sessionStorage에 저장한 state와 비교
    const savedState = sessionStorage.getItem('naver_state');
    if (savedState && savedState !== state) {
      console.error('Naver 콜백: state 불일치 (CSRF 의심)');
      navigate('/login', { replace: true });
      return;
    }

    // state 검증 후 정리
    sessionStorage.removeItem('naver_state');

    naverLogin({ code, state });
  }, [naverLogin, navigate, searchParams]);

  return null;
};

export default NaverCallbackPage;
