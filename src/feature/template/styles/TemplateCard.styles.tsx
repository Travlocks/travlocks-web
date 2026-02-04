import clsx from 'clsx';

export const templateCardStyles = {
  //Wrapper
  wrapper: (canHover: boolean = true) =>
    clsx(
      'w-[387px] aspect-[387/455]',
      'transition-transform duration-300 ease-in-out',
      canHover && 'hover:scale-[1.0336]', // 400/387 = 1.0336
    ),

  // Container
  container: (haveHoverGroup: boolean = true) =>
    clsx(
      haveHoverGroup && 'group',
      'w-full h-full',
      'rounded-[30px] overflow-hidden',
      'bg-white border ',
      haveHoverGroup ? 'border-base-color-3' : 'border-base-color-6',
      'shadow-[0_1px_20px_0_rgba(0,0,0,0.15)]',
      'relative flex flex-col',
    ),

  /**
   * Image
   * imageContainer의 overflow-hidden은 카드 컴포넌트 호버 시 줌인되는 이미지가 정해진 영역을 벗어나지 않도록 합니다.
   */
  imageContainer: 'w-full aspect-[387/240] overflow-hidden',
  image: (haveHoverGroup: boolean = true) =>
    clsx(
      'w-full h-full object-cover transition-transform duration-300 ease-in-out',
      haveHoverGroup && 'group-hover:scale-110',
    ),

  // Travel Theme
  travelTheme: (haveHoverGroup: boolean = true) =>
    clsx(
      'absolute top-[20px] right-[20px]',
      'p-[4px_20px]',
      'flex items-center justify-center',
      'rounded-[30px]',
      'b3 text-white',
      'whitespace-nowrap',
      //hover 시
      haveHoverGroup && 'group-hover:top-[20.67px] group-hover:right-[20.75px]',
      haveHoverGroup && 'group-hover:px-[20.672px] group-hover:py-[4.134px]',
    ),

  // Content
  content: 'flex-1 px-[20px] py-[18px_27px] flex flex-col justify-between gap-[30px]',
  topSection: 'flex flex-col gap-[7px]',
  bottomSection: 'flex flex-col gap-[16px]',

  // Title
  title: 'h6',

  // Subtitle
  subtitle: 'b3 font-medium text-[#717182]',

  // Metadata
  metadata: 'flex justify-between items-center',

  metadataItem: 'flex items-center gap-[4px] b3 text-base-color-2',
  starIcon: 'w-[20px] h-[20px]',
  pinIcon: 'w-[20px] h-[20px]',

  //button
  button: (haveHoverGroup: boolean = true) =>
    clsx(
      'box-border w-full py-[11px]',
      'flex items-center justify-center gap-[10px]',
      'rounded-[5px] border border-base-color-3 bg-white',
      'b3 font-medium text-base-color-0',
      'transition-all duration-300',
      haveHoverGroup && 'group-hover:border-primary-color group-hover:text-primary-color cursor-pointer',
    ),

  buttonIcon: 'w-[20px] h-[20px]',
} as const;
