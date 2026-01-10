import { resetPasswordSchema, type ResetPasswordFormData } from '@/shared/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

export function useResetPasswordForm(onSubmitResetPassword: (data: ResetPasswordFormData) => void) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const email = (useWatch({ control, name: 'email' }) ?? '') as string;
  const emailOk = !errors.email;
  const hasEmail = email.trim().length > 0;

  // 이메일과 비밀번호 값이 모두 입력되었는지 확인
  const canSubmit = hasEmail && emailOk && !isSubmitting;
  const submit = handleSubmit(onSubmitResetPassword);

  const inlineMessage = email.trim().length === 0 ? null : errors.email?.message ? String(errors.email.message) : null;

  return { canSubmit, submit, register, isSubmitting, inlineMessage };
}
