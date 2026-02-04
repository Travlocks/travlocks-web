import type { SidebarBlock } from './types/block';
import hotelImage from '@feature/block/blockBuild/assets/img-sample1.jpg';
import restaurantImage from '@feature/block/blockBuild/assets/img-sample2.jpg';
import cafeImage from '@feature/block/blockBuild/assets/img-sample3.jpg';
import hotelImage2 from '@feature/block/blockBuild/assets/img-sample4.jpg';

export const MOCK_BLOCKS: SidebarBlock[] = [
  { id: 1, name: '신라스테이', category: '숙소', duration: '1박', imageUrl: hotelImage },
  { id: 2, name: '향라식당', category: '식당', duration: '1시간', imageUrl: restaurantImage },
  { id: 3, name: '카페프리츠', category: '카페', duration: '2시간', imageUrl: cafeImage },
  { id: 4, name: '롯데호텔 제주', category: '숙소', duration: '2박', imageUrl: hotelImage2 },
  { id: 5, name: '빈티지샵', category: '쇼핑', duration: '3시간', imageUrl: restaurantImage },
  { id: 6, name: '제주민속촌', category: '문화', duration: '4시간', imageUrl: cafeImage },
  { id: 7, name: '수국투어', category: '투어', duration: '2시간', imageUrl: hotelImage },
  { id: 8, name: '방청소', category: '기타', duration: '1시간', imageUrl: restaurantImage },
  { id: 9, name: '서핑체험', category: '액티비티', duration: '3시간', imageUrl: cafeImage },
];
