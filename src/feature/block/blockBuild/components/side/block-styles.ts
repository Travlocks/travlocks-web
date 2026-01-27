import clsx from 'clsx';

// 카테고리별 색상 매핑
export const categoryColor = {
  숙소: '#FF459C',
  식당: '#FF5353',
  카페: '#E0B795',
  관광: '#5B8DEF',
};

export const blockItemStyles = {
  smallText: clsx('text-[12px]', 'font-light'),
  title: clsx('text-[15px]', 'font-medium'),
  time: clsx('text-[#9CA3AF]'),
  categoryColor,
};
