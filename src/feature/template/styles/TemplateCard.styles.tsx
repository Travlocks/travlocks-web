import clsx from 'clsx';

export const templateCardStyles = {
  //Wrapper
  wrapper: () =>
    clsx(
      'w-[387px] aspect-[387/455]',
      'transition-transform duration-300 ease-in-out',
      'hover:scale-[1.0336]', // 400/387 = 1.0336
    ),

  // Container
  container: clsx(
    'group',
    'w-full h-full',
    'rounded-[30px] overflow-hidden',
    'bg-white border border-base-color-3',
    'shadow-[0_1px_20px_0_rgba(0,0,0,0.15)]',
    'relative flex flex-col',
  ),

  /**
   * Image
   * imageContainer의 overflow-hidden은 카드 컴포넌트 호버 시 줌인되는 이미지가 정해진 영역을 벗어나지 않도록 합니다.
   */
  imageContainer: 'w-full aspect-[387/240] overflow-hidden',
  image: 'w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110',

  // Travel Theme
  travelTheme: clsx(
    'absolute top-[20px] right-[20px]',
    'p-[4px_20px]',
    'flex items-center justify-center',
    'rounded-[30px]',
    'tagText',
    'whitespace-nowrap',
    //hover 시
    'group-hover:top-[20.67px] group-hover:right-[20.75px]',
    'group-hover:px-[20.672px] group-hover:py-[4.134px]',
  ),

  // Content
  content: 'flex-1 px-[20px] py-[18px_27px] flex flex-col justify-between gap-[30px]',
  topSection: 'flex flex-col gap-[7px]',
  bottomSection: 'flex flex-col gap-[16px]',

  // Title
  title: 'h2',

  // Subtitle
  subtitle: 'b1 font-medium text-[#717182]',

  // Metadata
  metadata: 'flex justify-between items-center b1 text-base-color-1',

  metadataItem: 'flex items-center gap-[4px] b1 text-base-color-1',
  starIcon: 'w-[20px] h-[20px]',
  pinIcon: 'w-[20px] h-[20px]',

  //button
  button: clsx(
    'box-border w-full py-[11px]',
    'flex items-center justify-center gap-[10px]',
    'rounded-[5px] border border-base-color-3 bg-white',
    'b1 font-medium text-base-color-0',
    'cursor-pointer',
    'transition-all duration-300',
    'group-hover:border-primary-color group-hover:text-primary-color',
  ),

  buttonIcon: 'w-[20px] h-[20px]',
} as const;
