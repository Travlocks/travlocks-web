import { useLayoutEffect } from 'react';
import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import type { Step } from '@/pages/ResetPasswordPage';

const headerMap: Record<Step, (typeof AUTH_HEADER.password)[keyof typeof AUTH_HEADER.password]> = {
  form: AUTH_HEADER.password.request,
  sent: AUTH_HEADER.password.sent,
  reset: AUTH_HEADER.password.reset,
  success: AUTH_HEADER.password.success,
};

export const usePasswordHeader = (step: Step) => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();
  const header = headerMap[step];

  useLayoutEffect(() => {
    setAuthHeader(header);

    return () => resetAuthHeader();
  }, [header, setAuthHeader, resetAuthHeader]);

  return header;
};
