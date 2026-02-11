import type { ErrorPayload } from '@/shared/types/error';
import type { Content, ResponseSignupDto } from '@/feature/signup/types/auth';

// 온보딩 요청 타입
export type RequestOnboardingDto = {
  nickname: string;
  consents: Content[];
  preferredTravelStyleIds: number[];
  preferredTravelThemeIds: number[];
};

// 온보딩 응답 타입
export type SuccessOnboardingDto = ResponseSignupDto;
export type ErrorOnboardingDto = ErrorPayload<string>;
export type ResponseOnboardingDto = SuccessOnboardingDto | ErrorOnboardingDto;
