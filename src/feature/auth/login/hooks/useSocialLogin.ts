import { useCallback } from 'react';
import { getGoogleOAuthUrl, getKakaoOAuthUrl, getNaverOAuthUrl } from '../utils/oauthUrl';
import { toast } from '@/shared/stores/toastStore';

export const useSocialLogin = () => {
  const redirectToGoogle = useCallback(() => {
    window.location.href = getGoogleOAuthUrl();
  }, []);

  const redirectToNaver = useCallback(() => {
    window.location.href = getNaverOAuthUrl();
  }, []);

  const redirectToKakao = useCallback(() => {
    const url = getKakaoOAuthUrl();
    if (!url) {
      toast.error('카카오 로그인을 사용하려면 VITE_KAKAO_LOGIN_REST_API_KEY 설정이 필요합니다.', 'bottom-center');
      return;
    }
    window.location.href = url;
  }, []);

  const handleSocialLogin = useCallback(
    (provider: 'naver' | 'kakao' | 'google') => {
      switch (provider) {
        case 'google':
          return redirectToGoogle();
        case 'naver':
          return redirectToNaver();
        case 'kakao':
          return redirectToKakao();
      }
    },
    [redirectToGoogle, redirectToKakao, redirectToNaver],
  );

  return { handleSocialLogin, redirectToGoogle, redirectToKakao, redirectToNaver };
};
