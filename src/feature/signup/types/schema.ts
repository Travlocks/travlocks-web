import z from 'zod';

export const schema = z
  .object({
    email: z.string().email({ message: '올바르지 않은 이메일 형식입니다.' }),
    code: z.string(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/),
    passwordCheck: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' })
      .max(10, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' }),
    verificationId: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordCheck'],
  });

export type FormFields = z.infer<typeof schema>;
