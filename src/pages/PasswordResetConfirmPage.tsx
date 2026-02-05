import { useState } from 'react';
import PasswordResetView from '@/feature/auth/password/ui/PasswordResetConfirmView';
import type { Step } from './ResetPasswordPage';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';
import type { PasswordConfirmFormData } from '@/shared/utils/validationSchemas';

const PasswordResetConfirmPage = () => {
  const [step] = useState<Step>('reset');

  usePasswordHeader(step);

  const handleSubmit = (data: PasswordConfirmFormData) => {
    // TODO: 비밀번호 재설정 API 연동
    console.log('reset password submit', data);
  };

  return (
    <div className="mt-13 max-w-[500px] mx-auto">
      <PasswordResetView step={step} onSubmitResetPassword={handleSubmit} />
    </div>
  );
};

export default PasswordResetConfirmPage;
