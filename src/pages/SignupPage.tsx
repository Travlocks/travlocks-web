import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { useLayoutEffect } from 'react';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import Modal from '@/feature/signup/components/Modal';

const SignupPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER.signup);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return (
    <>
      <Modal />
    </>
  );
};

export default SignupPage;
