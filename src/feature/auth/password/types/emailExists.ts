import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 이메일 존재 여부 조회 성공 응답
export type EmailExistsSuccessResponse = SuccessPayload<{
  exists: boolean;
}>;

// 이메일 존재 여부 조회 에러 응답
export type EmailExistsErrorResponse = ErrorPayload<string>;

// 이메일 존재 여부 조회 응답
export type EmailExistsResponse = EmailExistsSuccessResponse | EmailExistsErrorResponse;
