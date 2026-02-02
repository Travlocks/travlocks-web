import clsx from 'clsx';

// 카테고리별 색상 매핑
export const categoryColor = {
  숙소: 'text-[#FF459C]',
  식당: 'text-[#FF5353]',
  카페: 'text-[#E0B795]',
  관광: 'text-[#5B8DEF]',
  기타: 'text-[#3C4EF4]',
  // TODO: 색상 추가 필요
};

export const blockItemStyles = {
  smallText: clsx('text-[12px]', 'font-light'),
  title: clsx('text-[15px]', 'font-light'),
  time: clsx('text-[#9CA3AF]'),
  categoryColor,
};
