<<<<<<< HEAD
export interface Vlock {
  vlockId: number;
  name: string;
  city: string;
  createdAt: string;
}
=======
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
>>>>>>> 58f4b4a (템플릿 블록 API 호출 작업 중)
