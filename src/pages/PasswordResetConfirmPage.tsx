import { useEffect, useRef, useState } from 'react';
import PasswordResetView from '@/feature/auth/password/ui/PasswordResetConfirmView';
import type { Step } from './ResetPasswordPage';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';
import type { PasswordConfirmFormData } from '@/shared/utils/validationSchemas';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyResetToken } from '@/feature/auth/password/hooks/useVerifyResetToken';

const PasswordResetConfirmPage = () => {
  const [step] = useState<Step>('reset');
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { mutate: verifyResetToken, isPending: isVerifying } = useVerifyResetToken({
    onSuccess: () => {
      setIsValidate(true);
    },
    onError: (error) => {
      const errorMessage = error.message;
      // 토큰이 없거나 유효하지 않은 경우 로그인 페이지로 리다이렉트
      console.error('토큰 검증 실패:', errorMessage);
      navigate('/login', { replace: true });
    },
  });

  // 토큰 검증 중복 방지
  const tokenRef = useRef<boolean>(false);

  // 토큰 검증
  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('resetToken');

    if (tokenRef.current) return;

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    tokenRef.current = true;
    verifyResetToken(token);
  }, [searchParams, navigate, verifyResetToken]);

  usePasswordHeader(step);

  if (!isValidate || isVerifying) {
    return null;
  }

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
