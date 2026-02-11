import type { SuccessPayload } from '@/shared/types/common';
import type { Login } from './login.types';
import type { ErrorPayload } from '@/shared/types/error';

// naver login
export type RequestNaverLoginDto = {
  code: string;
  state: string;
};

// google login
export type RequestGoogleLoginDto = {
  idToken: string;
};

// naver login 응답 타입
export type SuccessNaverLoginDto = SuccessPayload<Login>;
export type ErrorNaverLoginDto = ErrorPayload<string>;
export type ResponseNaverLoginDto = SuccessNaverLoginDto | ErrorNaverLoginDto;

// google login 응답 타입
export type SuccessGoogleLoginDto = SuccessPayload<Login>;
export type ErrorGoogleLoginDto = ErrorPayload<string>;
export type ResponseGoogleLoginDto = SuccessGoogleLoginDto | ErrorGoogleLoginDto;
