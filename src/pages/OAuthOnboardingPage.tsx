import { useLayoutEffect } from 'react';

import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import SignupView from '@/feature/signup/components/SignupView';

import type { AuthLayoutHeader } from '@/shared/layouts/auth/AuthLayout.type';

const ONBOARDING_HEADER: AuthLayoutHeader = {
  description: '조립하는 즐거움, 나만의 여행 블록 쌓기',
  showAuthNav: false,
  buttonText: '여행 시작하기',
};

const OAuthOnboardingPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(ONBOARDING_HEADER);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return <SignupView mode="onboarding" />;
};

export default OAuthOnboardingPage;
