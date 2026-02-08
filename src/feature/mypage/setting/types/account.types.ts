import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

// 계정 탈퇴 요청 타입
export type RequestAccountWithdrawalDto = {
  reason: string;
};

// 계정 탈퇴 성공 타입
export type AccountWithdrawalSuccessDto = SuccessPayload<string>;

// 계정 탈퇴 실패 타입
export type AccountWithdrawalErrorDto = ErrorPayload<string>;

// 계정 탈퇴 응답 타입
export type ResponseAccountWithdrawalDto = AccountWithdrawalSuccessDto | AccountWithdrawalErrorDto;
