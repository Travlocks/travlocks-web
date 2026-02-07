// Vlock 상세 정보
export type Vlock = {
  vlockId: number;
  name: string;
  vlockCategoryId: number;
  categoryName: string;
  coverImgUrl: string;
  address: string;
  latitude: number;
  longitude: number;
};

// Vlock 요약 정보
export type VlockSummary = {
  vlockId: number;
  name: string;
  coverImgUrl: string;
};
