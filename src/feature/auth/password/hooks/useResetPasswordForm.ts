import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import { passwordConfirmSchema, type PasswordConfirmFormData } from '@/shared/utils/validationSchemas';

const emailSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다.'),
});

export type ResetEmailFormData = z.infer<typeof emailSchema>;

// 이메일 전송 폼
export function useResetPasswordForm(onSubmitResetPassword: (data: ResetEmailFormData) => void) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetEmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const email = (useWatch({ control, name: 'email' }) ?? '') as string;
  const emailOk = !errors.email;
  const hasEmail = email.trim().length > 0;

  const canSubmit = hasEmail && emailOk && !isSubmitting;
  const submit = handleSubmit(onSubmitResetPassword);

  const inlineMessage = email.trim().length === 0 ? null : errors.email?.message ? String(errors.email.message) : null;

  return { canSubmit, submit, register, isSubmitting, inlineMessage };
}

// 비밀번호 재설정 폼
export function usePasswordConfirmForm(onSubmit: (data: PasswordConfirmFormData) => void) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isSubmitting },
    trigger,
  } = useForm<PasswordConfirmFormData>({
    resolver: zodResolver(passwordConfirmSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      passwordCheck: '',
    },
  });

  const password = watch('password') ?? '';
  const passwordCheck = watch('passwordCheck') ?? '';

  const isLengthValid = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isCombinationValid = hasLetter && hasNumber;

  // passwordCheck 재검증
  useEffect(() => {
    if (passwordCheck) {
      void trigger('passwordCheck');
    }
  }, [password, passwordCheck, trigger]);

  const canSubmit =
    !!password && !!passwordCheck && !errors.password && !errors.passwordCheck && !isSubmitting && isCombinationValid;

  const submit = handleSubmit(onSubmit);

  return {
    register,
    submit,
    isSubmitting,
    canSubmit,
    errors,
    dirtyFields,
    password,
    passwordCheck,
    isLengthValid,
    isCombinationValid,
  };
}
