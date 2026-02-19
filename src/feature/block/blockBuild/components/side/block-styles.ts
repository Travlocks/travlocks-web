import clsx from 'clsx';

// 카테고리별 색상 매핑
export const categoryColor = {
  숙소: 'text-[#FF459C]',
  식당: 'text-[#FF5353]',
  쇼핑: 'text-[#FF8A3C]',
  카페: 'text-[#E0B795]',
  문화: 'text-[#B37CFF]',
  액티비티: 'text-[#BBE23A]',
  투어: 'text-[#2FD4A4]',
  기타: 'text-[#3C4EF4]',
  관광지: 'text-[#5B8DEF]',
};

export const blockItemStyles = {
  smallText: clsx('text-[12px]', 'font-light'),
  title: clsx('text-[15px]', 'font-light', 'line-clamp-1'),
  time: clsx('text-[#9CA3AF]'),
  categoryColor,
};
