import { useLayoutEffect } from 'react';

import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import SignupView from '@/feature/signup/components/SignupView';

const SignupPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER.signup);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return (
    <>
      <SignupView />
    </>
  );
};

export default SignupPage;
