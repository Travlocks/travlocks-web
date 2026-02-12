import { z } from 'zod';

// 회원가입 / 온보딩 공통 필드
const nicknameField = z
  .string()
  .min(2, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' })
  .max(10, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' });

const consentsField = z.array(
  z.object({
    policyId: z.number(),
    agreed: z.boolean(),
  }),
);

// 일반 회원가입 스키마
export const signupSchema = z.object({
  email: z.string().email({ message: '올바르지 않은 이메일 형식입니다.' }),
  code: z.string(),

  passwordGroup: z
    .object({
      password: z
        .string()
        .min(8)
        .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/),
      passwordCheck: z.string(),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: '비밀번호가 일치하지 않습니다',
      path: ['passwordCheck'],
    }),

  nickname: nicknameField,
  verificationId: z.string(),
  signupToken: z.string(),
  consents: consentsField,
  preferredTravelStyleIds: z.array(z.number()),
  preferredTravelThemeIds: z.array(z.number()),
});

// OAuth 온보딩 스키마
export const onboardingSchema = z.object({
  nickname: nicknameField,
  consents: consentsField,
  preferredTravelStyleIds: z.array(z.number()),
  preferredTravelThemeIds: z.array(z.number()),
});

export const schema = signupSchema;

export type FormFields = z.infer<typeof signupSchema>;
export type OnboardingFormFields = z.infer<typeof onboardingSchema>;
