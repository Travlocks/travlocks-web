import { z } from 'zod';

// 로그인 폼 유효성 검사 스키마
export const loginSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 비밀번호 재설정 폼 유효성 검사 스키마
export const resetPasswordSchema = z.object({
  email: z.string().trim().email('이메일 형식이 올바르지 않습니다.'),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
