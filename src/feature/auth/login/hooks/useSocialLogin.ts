import { useCallback } from 'react';
import { getGoogleOAuthUrl, getNaverOAuthUrl } from '../utils/oauthUrl';

export const useSocialLogin = () => {
  const redirectToGoogle = useCallback(() => {
    window.location.href = getGoogleOAuthUrl();
  }, []);

  const redirectToNaver = useCallback(() => {
    window.location.href = getNaverOAuthUrl();
  }, []);

  const handleSocialLogin = useCallback(
    (provider: 'naver' | 'google') => {
      switch (provider) {
        case 'google':
          return redirectToGoogle();
        case 'naver':
          return redirectToNaver();
      }
    },
    [redirectToGoogle, redirectToNaver],
  );

  return { handleSocialLogin, redirectToGoogle, redirectToNaver };
};
