import clsx from 'clsx';

export const TemplateSwiperStyle = {
  // Embla viewport (중앙 정렬을 위해 mx-auto 추가)
  embla: 'max-w-[1920px] mx-auto py-[30px]',

  // Embla container (scroll body)
  container: 'w-full flex items-center',

  // Slide wrapper
  slide: clsx('flex-[0_0_427px] min-w-0 pr-[40px]'),

  // Navigation buttons container
  buttons: 'flex gap-[20px] mt-[20px]',

  // Navigation button
  button:
    'w-[50px] h-[50px] rounded-full bg-white border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 disabled:opacity-50',
} as const;
