import Input from '@/shared/components/Form/Input';
import { useResetPasswordForm } from '../hooks/useResetPasswordForm';
import Button from '@/shared/components/Button/Button';
import Alert from '@/shared/components/Form/Alert';
import { Link } from 'react-router-dom';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import type { Step } from '@/pages/ResetPasswordPage';
import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import type { ResetPasswordFormData } from '@/shared/utils/validationSchemas';

type Props = {
  step: Step;
  onSendMail: (email: string) => Promise<void>;
};

const PasswordView = ({ step, onSendMail }: Props) => {
  const onSubmitResetPassword = async (data: ResetPasswordFormData) => {
    await onSendMail(data.email);
  };

  const { register, canSubmit, isSubmitting, inlineMessage, submit } = useResetPasswordForm(onSubmitResetPassword);

  if (step === 'sent') {
    const { buttonText } = AUTH_HEADER.password.sent;

    return (
      <Link to="/login" className="w-full">
        <Button text={buttonText} showIcon className="w-full rounded-[10px]" />
      </Link>
    );
  }

  return (
    <>
      <form onSubmit={submit}>
        <Input register={register('email')} label="left" type="email" placeholder="your@email.com" width={500} />
        {inlineMessage && <Alert type="alert" text={inlineMessage} className="mt-2.5" />}
        <Button
          type="submit"
          text={AUTH_HEADER.password.request.buttonText}
          disabled={!canSubmit || isSubmitting}
          className="rounded-[10px] mt-10"
        />
      </form>
      <Link to="/login" className="flex justify-center items-center gap-2.5 mt-5">
        <AppIcon name="arrow" className="rotate-180 text-base-color-1" size={16} />
        <p className="b4 text-base-color-1">로그인으로 돌아가기</p>
      </Link>
    </>
  );
};

export default PasswordView;
