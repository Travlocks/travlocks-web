import PasswordView from '@/feature/auth/password/ui/PasswordView';
import { useState } from 'react';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';
import { usePasswordResetLink } from '@/feature/auth/password/hooks/usePasswordResetLink';

export type Step = 'form' | 'sent' | 'reset' | 'success';

const ResetPasswordPage = () => {
  const [step, setStep] = useState<Step>('form');

  usePasswordHeader(step);

  const { resetPasswordLink } = usePasswordResetLink({
    onSuccess: () => {
      setStep('sent');
    },
    onError: (_error, errorMessage) => {
      console.error('비밀번호 재설정 링크 전송 실패:', errorMessage);
    },
  });

  const onSendMail = async (email: string) => {
    resetPasswordLink({ email });
  };

  return (
    <div className="mt-13 max-w-[500px] mx-auto">
      <PasswordView step={step} onSendMail={onSendMail} />
    </div>
  );
};

export default ResetPasswordPage;
