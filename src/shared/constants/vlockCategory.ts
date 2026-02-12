export type vlockCategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type vlockCategoryKey = '숙소' | '식당' | '카페' | '쇼핑' | '관광지' | '액티비티' | '문화' | '기타';

export interface VlockCategoryConstant {
  id: vlockCategoryId;
  key: vlockCategoryKey;
}

export const VLOCK_CATEGORY_OPTIONS: VlockCategoryConstant[] = [
  { id: 1, key: '숙소' },
  { id: 2, key: '식당' },
  { id: 3, key: '카페' },
  { id: 4, key: '쇼핑' },
  { id: 5, key: '관광지' },
  { id: 6, key: '액티비티' },
  { id: 7, key: '문화' },
  { id: 8, key: '기타' },
];

export const VLOCK_CATEGORY_MAP: Record<vlockCategoryId, vlockCategoryKey> = {
  1: '숙소',
  2: '식당',
  3: '카페',
  4: '쇼핑',
  5: '관광지',
  6: '액티비티',
  7: '문화',
  8: '기타',
};
