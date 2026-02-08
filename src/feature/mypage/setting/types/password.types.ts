// TODO: 비밀번호 재설정 머지되면 수정 (임시파일)

import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';

export type MemberParams = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: number;
  nickname: string;
  introduction: string;
  email: string;
  profileImageUrl: string;
  status: 'ACTIVE' | 'INACTIVE';
  emailVerified: boolean;
  vlockCount: number;
  templateCount: number;
  startCount: number;
  deleted: boolean;
};

// 비밀번호 변경 요청 타입
export type RequestPasswordDto = {
  currentPassword: string;
  newPassword: string;
};

// 비밀번호 변경 성공 응답 타입
export type PasswordSuccessResponse = SuccessPayload<null>;

// 비밀번호 변경 에러 응답 타입
export type PasswordErrorResponse = ErrorPayload<string>;

export type PasswordResponse = PasswordSuccessResponse | PasswordErrorResponse;
