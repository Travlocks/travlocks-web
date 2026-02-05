import PasswordView from '@/feature/auth/password/ui/PasswordView';
import { useState } from 'react';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';

export type Step = 'form' | 'sent' | 'reset' | 'success';

const ResetPasswordPage = () => {
  const [step, setStep] = useState<Step>('form');

  usePasswordHeader(step);

  const onSendMail = () => {
    console.log('onSendMail');
    setStep('sent');
  };

  return (
    <div className="mt-13 max-w-[500px] mx-auto">
      <PasswordView step={step} onSendMail={() => onSendMail()} />
    </div>
  );
};

export default ResetPasswordPage;
