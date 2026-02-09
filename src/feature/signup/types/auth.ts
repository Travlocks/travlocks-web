import type { SuccessPayload } from '@/shared/types/common';

// 이메일 인증 코드 발송
export type RequestEmailVerifiacationDto = {
  email: string;
};

export type ResponseEmailVerificationDto = SuccessPayload<{
  verificationId: string;
}>;

// 이메일 인증 코드 확인
export type RequestEmailVerificationConfirmDto = {
  verificationId: string;
  code: string;
};

export type ResponseEmailVerificationConfirmDto = SuccessPayload<{
  signupToken?: string;
} | null>;

// 이메일 인증 코드 재발송
export type RequestEmailVerificationResnedDto = Omit<RequestEmailVerificationConfirmDto, 'code'>;

export type ResponseEmailVerificationResendDto = SuccessPayload<null>;

// 닉네임 중복 검사
export type RequestNicknameDto = {
  nickname: string;
};

export type ResponseNicknameDto = SuccessPayload<{
  exists: boolean;
}>;

// 최종 회원가입
export type Content = {
  policyId: number;
  agreed: boolean;
};

export type RequestSignupDto = {
  signupToken: string;
  email: string;
  password: string;
  nickname: string;
  consents: Content[];
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
};

export type preferredTravelTheme = {
  themeId: number;
  content: string;
};

export type preferredTravelStyle = {
  styleId: number;
  content: string;
};

export type ResponseSignupDto = SuccessPayload<{
  memberId: number;
  nickname: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  profileImageUrl: string;
  preferredTravelThemes: preferredTravelTheme[] | [];
  preferredTravelStyles: preferredTravelStyle[] | [];
}>;
