export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  place_url: string;
  x: string;
  y: string;
}

export interface KakaoPagination {
  nextPage: () => void;
  prevPage: () => void;
  gotoPage: (page: number) => void;
  current: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalCount: number;
}

export type KakaoStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}
