import PasswordView from '@/feature/auth/password/ui/PasswordView';
import { useState } from 'react';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';
import { postPasswordResetLink } from '@/feature/auth/password/apis/passwordReset';

export type Step = 'form' | 'sent' | 'reset' | 'success';

const ResetPasswordPage = () => {
  const [step, setStep] = useState<Step>('form');

  usePasswordHeader(step);

  const onSendMail = async (email: string) => {
    try {
      await postPasswordResetLink({ email });
      setStep('sent');
    } catch (error) {
      console.error('비밀번호 재설정 링크 전송 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  return (
    <div className="mt-13 max-w-[500px] mx-auto">
      <PasswordView step={step} onSendMail={onSendMail} />
    </div>
  );
};

export default ResetPasswordPage;
