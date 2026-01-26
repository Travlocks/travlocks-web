import type { Block } from './types/block';
import hotelImage from '@assets/blockEdit/img-sample1.jpg';
import restaurantImage from '@assets/blockEdit/img-sample2.jpg';
import cafeImage from '@assets/blockEdit/img-sample3.jpg';
import hotelImage2 from '@assets/blockEdit/img-sample4.jpg';

export const MOCK_BLOCKS: Block[] = [
  { blockId: 1, name: '신라스테이', category: '숙소', duration: '1박', imageUrl: hotelImage },
  { blockId: 2, name: '향라식당', category: '식당', duration: '2시간', imageUrl: restaurantImage },
  { blockId: 3, name: '카페프리츠', category: '카페', duration: '2시간', imageUrl: cafeImage },
  { blockId: 4, name: '롯데호텔 제주', category: '숙소', duration: '1박', imageUrl: hotelImage2 },
];
