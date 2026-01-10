import { useState } from 'react';
import Input from '@/shared/components/Form/Input';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import type { ResetPasswordFormData } from '@/shared/utils/validationSchemas';
import Button from '@/shared/components/Button/Button';
import Alert from '@/shared/components/Form/Alert';
import { Link } from 'react-router-dom';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { useNavigate } from 'react-router-dom';

const PasswordView = () => {
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const onSubmitResetPassword = (data: ResetPasswordFormData) => {
    console.log(data);
  };

  const { register, canSubmit, isSubmitting, inlineMessage } = useResetPasswordForm(onSubmitResetPassword);

  const handleSubmitResetPassword = () => {
    setIsSent(true);
  };

  if (isSent) {
    const content = isSent && {
      subtitle: '비밀번호 재설정 메일 발송 완료',
      description: '재설정 링크가 포함된 메일이 발송되었습니다.\n메일함을 확인해주세요.',
      buttonText: '로그인화면으로',
    };
    return (
      <div className="flex flex-col">
        {/* 레이아웃 대신 페이지에서 문구를 컨트롤 */}
        <h2 className="text-[23px] font-bold text-black text-center mb-4 whitespace-pre-wrap">{content.subtitle}</h2>
        <p className="t2 text-base-color-2 text-center mb-12 whitespace-pre-wrap">{content.description}</p>

        {isSent && <Button text={content.buttonText} onClick={() => navigate('/login')} />}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmitResetPassword}>
        <Input register={register('email')} label="left" type="email" placeholder="your@email.com" />
        {inlineMessage && <Alert type="alert" text={inlineMessage} className="mt-2.5" />}
        <Button
          type="submit"
          text="비밀번호 재설정 링크 전송"
          disabled={!canSubmit || isSubmitting}
          className="rounded-[10px] mt-10"
        />
      </form>
      <Link to="/login" className="flex justify-center items-center gap-2.5 mt-5">
        <AppIcon name="arrow" className="rotate-180" fill="base-color-2" size={16} />
        <p className="h3 font-medium text-base-color-2">로그인으로 돌아가기</p>
      </Link>
    </>
  );
};

export default PasswordView;
