// TODO: 비밀번호 재설정 머지되면 수정 (임시파일)

import type { SuccessPayload } from '@/shared/types/common';

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

export type RequestPasswordDto = {
  currentPassword: string;
  newPassword: string;
};

export type ResponsePasswordDto = SuccessPayload<null>;
