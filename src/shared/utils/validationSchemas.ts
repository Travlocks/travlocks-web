import { z } from 'zod';

// 공통 이메일 스키마
export const emailSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다.'),
});

// 로그인 폼 유효성 검사 스키마
export const loginSchema = z.object({
  email: emailSchema.shape.email,
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 비밀번호 재설정 - 이메일 입력 스키마
export const resetPasswordSchema = emailSchema;

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// 비밀번호 재설정 - 비밀번호/확인 입력 스키마
export const passwordConfirmSchema = z
  .object({
    password: z.string().min(8, '최소 8자 이상'),
    passwordCheck: z.string().min(8, '최소 8자 이상'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type PasswordConfirmFormData = z.infer<typeof passwordConfirmSchema>;
