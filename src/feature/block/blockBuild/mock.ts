import type { SidebarBlock } from './types/block';
import hotelImage from '@feature/block/blockBuild/assets/img-sample1.jpg';
import restaurantImage from '@feature/block/blockBuild/assets/img-sample2.jpg';
import cafeImage from '@feature/block/blockBuild/assets/img-sample3.jpg';
import hotelImage2 from '@feature/block/blockBuild/assets/img-sample4.jpg';

export const MOCK_BLOCKS: SidebarBlock[] = [
  { id: 1, name: '신라스테이', category: '숙소', duration: '1박', imageUrl: hotelImage },
  { id: 2, name: '향라식당', category: '식당', duration: '2시간', imageUrl: restaurantImage },
  { id: 3, name: '카페프리츠', category: '카페', duration: '2시간', imageUrl: cafeImage },
  { id: 4, name: '롯데호텔 제주', category: '숙소', duration: '1박', imageUrl: hotelImage2 },
];
