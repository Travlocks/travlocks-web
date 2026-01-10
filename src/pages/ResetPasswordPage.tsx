import PasswordView from '@/feature/auth/password/ui/PasswordView';
import { useAuthLayoutHeader } from '@/shared/layouts/auth/useAuthLayoutHeader';
import { useLayoutEffect, useState } from 'react';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';

export type Step = 'form' | 'sent';

const ResetPasswordPage = () => {
  const { setAuthHeader, resetAuthHeader } = useAuthLayoutHeader();
  const [step, setStep] = useState<Step>('form');

  useLayoutEffect(() => {
    if (step === 'sent') {
      setAuthHeader(AUTH_HEADER.password.sent);
    } else {
      setAuthHeader(AUTH_HEADER.password.request);
    }
    return () => resetAuthHeader();
  }, [step, setAuthHeader, resetAuthHeader]);

  const onSendMail = async (email: string) => {
    // TODO: API 호출
    console.log(email);
    setStep('sent');
  };

  return (
    <div className="mt-13 max-w-[440px] mx-auto">
      <PasswordView step={step} onSendMail={onSendMail} />
    </div>
  );
};

export default ResetPasswordPage;
