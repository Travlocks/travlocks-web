export type CategoryType = '숙소' | '식당' | '카페' | '관광';

// 샘플 데이터 타입
export type Block = {
  blockId: number;
  name: string;
  category: CategoryType;
  duration: string;
  imageUrl?: string;
};
