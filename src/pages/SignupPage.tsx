import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { useLayoutEffect } from 'react';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';

const SignupPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER.signup);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return <div>회원가입 페이지</div>;
};

export default SignupPage;
