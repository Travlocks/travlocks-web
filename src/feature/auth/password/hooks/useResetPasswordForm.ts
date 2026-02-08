import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import {
  passwordConfirmSchema,
  type PasswordConfirmFormData,
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '@/shared/utils/validationSchemas';
import { useEmailValidationWithValues } from '@/shared/hooks/useEmailValidation';

// 이메일 전송 폼
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
  const trimmedEmail = email.trim();
  const emailOk = !errors.email;
  const hasEmail = trimmedEmail.length > 0;

  // 이메일 존재 검증 (비밀번호 재설정 모드)
  // useFormContext를 사용하지 않으므로 직접 값 전달
  const { emailExistsMessage, isCheckingEmail, canProceed } = useEmailValidationWithValues({
    email: trimmedEmail,
    emailOk,
    mode: 'reset',
  });

  // 인라인 메시지: 폼 에러 또는 이메일 존재 검증 에러
  const inlineMessage =
    trimmedEmail.length === 0 ? null : errors.email?.message ? String(errors.email.message) : emailExistsMessage;

  // 제출 가능 여부: 이메일 유효 + 존재 검증 통과 + 제출 중 아님
  const canSubmit = hasEmail && emailOk && !isSubmitting && !isCheckingEmail && canProceed;

  const submit = handleSubmit(onSubmitResetPassword);

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
