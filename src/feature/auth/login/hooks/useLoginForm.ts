import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginFormData, loginSchema } from '@/shared/utils/validationSchemas';
import { useForm, useWatch } from 'react-hook-form';

// 로그인 폼 훅
export function useLoginForm(onSubmit: (data: LoginFormData) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // validationSchema 에 따라 유효성 검사 후 값 가져오기
  const email = (useWatch({ control, name: 'email' }) ?? '') as string;
  const password = (useWatch({ control, name: 'password' }) ?? '') as string;

  // 이메일과 비밀번호 값이 모두 입력되었는지 확인
  const hasBoth = email.trim().length > 0 && password.trim().length > 0;
  const emailOk = !errors.email;

  const canSubmit = hasBoth && emailOk && !isSubmitting;
  const submit = handleSubmit(onSubmit);

  // 이메일 입력 필드 에러 메시지 가져오기
  const inlineMessage = email.trim().length === 0 ? null : errors.email?.message ? String(errors.email.message) : null;

  return { canSubmit, submit, register, isSubmitting, inlineMessage };
}
