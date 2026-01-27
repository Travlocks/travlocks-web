import type { ConnectorLine } from './drag';

export type CategoryType = '숙소' | '식당' | '카페' | '관광' | '문화' | '액티비티' | '투어' | '기타';

// 샘플 사이드바 데이터 타입
export type SidebarBlock = {
  id: number;
  name: string;
  category: CategoryType;
  duration: string;
  imageUrl?: string;
};

// 샘플 블록 데이터 타입
export type Block = {
  blockId: number;
  name: string;
  category: CategoryType;
  duration: string;
  imageUrl?: string;
  // 보드 위치
  x: number;
  y: number;
  w: number;
  h: number;
  // 커넥터 선
  connectors?: {
    input: ConnectorLine | null;
    output: ConnectorLine | null;
  } | null;
  // 연결된 블록 ID
  connectedTo?: number | null;
  connectedFrom?: number | null;
};
