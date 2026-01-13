import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { LoginView } from '@feature/auth/login/ui/LoginView';
import { useLayoutEffect } from 'react';

const LoginPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();

  useLayoutEffect(() => {
    setAuthHeader(AUTH_HEADER.login);
    return () => resetAuthHeader();
  }, [setAuthHeader, resetAuthHeader]);

  return <LoginView />;
};

export default LoginPage;
