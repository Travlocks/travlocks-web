import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PasswordResetView from '@/feature/auth/password/ui/PasswordResetConfirmView';
import type { Step } from './ResetPasswordPage';
import { usePasswordHeader } from '@/feature/auth/password/hooks/usePasswordHeader';
import type { PasswordConfirmFormData } from '@/shared/utils/validationSchemas';
import { useVerifyResetToken } from '@/feature/auth/password/hooks/useVerifyResetToken';

const PasswordResetConfirmPage = () => {
  const [step] = useState<Step>('reset');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  usePasswordHeader(step);

  const token = searchParams.get('token') || searchParams.get('resetToken');

  const { data, error, isPending: isVerifying } = useVerifyResetToken(token);

  // 토큰 검증 결과 처리
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    if (error) {
      // 토큰 검증 실패 시 로그인 페이지로 리다이렉트
      console.error('토큰 검증 실패:', error.message);
      navigate('/login', { replace: true });
      return;
    }

    if (data && !data.data.valid) {
      // 토큰이 유효하지 않은 경우
      console.error('토큰이 올바르지 않거나 만료되었습니다.');
      navigate('/login', { replace: true });
    }
  }, [data, error, token, navigate]);

  const handleSubmit = (data: PasswordConfirmFormData) => {
    // TODO: 비밀번호 재설정 API 연동
    console.log('reset password submit', data);
  };

  // 토큰이 없거나 검증 중이거나 에러가 있으면 로딩 표시
  if (!token || isVerifying || error || (data && !data.data.valid)) {
    return <div>Verifying...</div>;
  }

  return (
    <div className="mt-13 max-w-[500px] mx-auto">
      <PasswordResetView step={step} onSubmitResetPassword={handleSubmit} />
    </div>
  );
};

export default PasswordResetConfirmPage;
