import type { SuccessPayload } from '@/shared/types/common';
import type { ErrorPayload } from '@/shared/types/error';
import type { Vlock, VlockSummary } from '@/shared/types/vlock';

export type ConnectionPortType = 'TOP_LEFT' | 'BOTTOM_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT';

// ─────────────────────────────────────────────────────────────────────────────
// Request DTOs
// ─────────────────────────────────────────────────────────────────────────────

// 블록 추가 요청 타입
export type RequestCreateBlockDto = {
  vlockId: number;
  canvasX?: number | null;
  canvasY?: number | null;
  inputPort?: ConnectionPortType | null;
  outputPort?: ConnectionPortType | null;
};

// 템플릿 수정 요청 타입
export type UpdateTemplateRequestDto = {
  title: string;
  description: string;
  isPublic: boolean;
};

// 블록 순서 변경 요청 타입
export type RequestReorderBlocksDto = {
  vlockOrders: Array<{
    templateVlocksId: number;
    orderNo: number;
    canvasX?: number | null;
    canvasY?: number | null;
    inputPort?: ConnectionPortType | null;
    outputPort?: ConnectionPortType | null;
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
  stayHours: number;
  canvasX: number | null;
  canvasY: number | null;
  inputPort: ConnectionPortType | null;
  outputPort: ConnectionPortType | null;
  vlock: Vlock;
  createdAt: string;
  warning: string | null;
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
  transportType: 'CAR' | 'WALK' | 'TRANSIT' | 'PUBLIC';
  distanceMeter: number;
} | null;

// 순서 변경 후 블록 정보
export type ReorderedVlock = {
  templateVlocksId: number;
  orderNo: number;
  stayHours: number;
  canvasX: number | null;
  canvasY: number | null;
  inputPort: ConnectionPortType | null;
  outputPort: ConnectionPortType | null;
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

export type TemplateSummaryDayData = {
  templateDayId: number;
  dayNo: number;
  vlockCount: number;
  stayHours: number;
  moveMinutes: number;
  warnings: string[];
};

export type TemplateSummaryData = {
  templateId: number;
  totalVlocks: number;
  totalStayHours: number;
  totalMoveMinutes: number;
  daysSummary: TemplateSummaryDayData[];
};

export type ResponseTemplateSummaryDto = SuccessPayload<TemplateSummaryData>;

// 캔버스 조회 응답 데이터
export type CanvasVlockBrief = {
  vlockId: number;
  name: string;
  category: string;
};

export type CanvasVlockData = {
  templateVlockId: number;
  orderNo: number;
  stayHours: number;
  canvasX: number | null;
  canvasY: number | null;
  inputPort: ConnectionPortType | null;
  outputPort: ConnectionPortType | null;
  nextMoveMinutes: number;
  vlock: CanvasVlockBrief;
};

export type CanvasData = {
  templateId: number;
  title: string;
  dayNo: number;
  tripDays: number;
  vlockCount: number;
  totalHours: number;
  totalMoveHours: number;
  totalStayHours: number;
  cities: number[];
  vlocks: CanvasVlockData[];
  createdAt: string;
};

export type ResponseCanvasDto = SuccessPayload<CanvasData>;

// AI 스마트 정렬 응답 데이터
export type OptimizeVlockItem = {
  templateVlockId: number;
  orderNo: number;
  stayTimes: string;
  vlockId: number;
  vlockName: string;
  categoryName: string;
};

export type OptimizeData = {
  templateDayId: number;
  vlocks: OptimizeVlockItem[];
  distance: number;
};

// AI 스마트 정렬 성공 응답 타입
export type ResponseOptimizeDto = SuccessPayload<OptimizeData>;

// AI 스마트 정렬 에러 응답 타입
export type ResponseOptimizeErrorDto = ErrorPayload<null>;

// 템플릿 수정 응답 타입
export type UpdateTemplateResponseDto = SuccessPayload<{
  templateId: number;
  title: string;
  description: string;
  isPublic: boolean;
  coverImageUrl: string;
  shareToken: string;
  updatedAt: string;
}>;
