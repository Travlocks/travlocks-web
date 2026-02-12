import type { Connector, Point } from '@/shared/components/Block/blockShape';

export type CategoryType = '숙소' | '식당' | '카페' | '쇼핑' | '관광지' | '문화' | '액티비티' | '투어' | '기타';

// 샘플 사이드바 데이터 타입
export type SidebarBlock = {
  id: number;
  name: string;
  category: CategoryType;
  duration: string;
  imageUrl?: string;
};

// 캔버스 블록 데이터 타입
export type Block = {
  blockId: number; // vlockId와 동일하게 매핑됨
  templateVlocksId?: number; // 서버에서 생성된 template_vlocks ID
  name: string;
  category: CategoryType;
  duration: string;
  imageUrl?: string;
  color?: string;
  // 보드 위치
  x: number;
  y: number;
  w: number;
  h: number;
  // 블록 모양 (폴리곤 포인트)
  points: Point[];
  // 커넥터 설정
  connectors: Connector[];
  // 연결된 블록 ID
  connectedTo?: number | null;
  connectedFrom?: number | null;
};
