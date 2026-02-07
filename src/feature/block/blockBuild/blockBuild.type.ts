import type { SuccessPayload } from '@/shared/types/common';
import type { Vlock, VlockSummary } from '@/shared/types/vlock';

// ─────────────────────────────────────────────────────────────────────────────
// Request DTOs
// ─────────────────────────────────────────────────────────────────────────────

// 블록 추가 요청 타입
export type RequestCreateBlockDto = {
  vlockId: number;
  orderNo: number;
};

// 블록 순서 변경 요청 타입
export type RequestReorderBlocksDto = {
  vlockOrders: Array<{
    templateVlocksId: number;
    orderNo: number;
  }>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Response DTOs
// ─────────────────────────────────────────────────────────────────────────────

// 블록 생성 응답 데이터
export type CreateBlockData = {
  templateVlocksId: number;
  templateDayId: number;
  dayNo: number;
  orderNo: number;
  stayMinutes: number;
  vlock: Vlock;
  createdAt: string;
};

// 블록 생성 성공 응답 타입
export type ResponseCreateBlockDto = SuccessPayload<CreateBlockData>;

// 삭제된 블록 잔여 목록 항목
export type RemainingVlock = {
  templateVlocksId: number;
  orderNo: number;
  vlockName: string;
};

// 블록 삭제 응답 데이터
export type DeleteBlockData = {
  deletedTemplateVlocksId: number;
  templateDayId: number;
  dayNo: number;
  remainingVlocks: RemainingVlock[];
};

// 블록 삭제 성공 응답 타입
export type ResponseDeleteBlockDto = SuccessPayload<DeleteBlockData>;

// 이동 정보
export type MoveInfo = {
  moveMinutes: number;
  transportType: 'CAR' | 'WALK' | 'PUBLIC';
  distanceMeter: number;
} | null;

// 순서 변경 후 블록 정보
export type ReorderedVlock = {
  templateVlocksId: number;
  orderNo: number;
  stayMinutes: number;
  vlock: VlockSummary;
  moveToNext: MoveInfo;
};

// 블록 순서 변경 응답 데이터
export type ReorderBlocksData = {
  templateDayId: number;
  dayNo: number;
  vlocks: ReorderedVlock[];
  warnings: string[];
};

// 블록 순서 변경 성공 응답 타입
export type ResponseReorderBlocksDto = SuccessPayload<ReorderBlocksData>;
