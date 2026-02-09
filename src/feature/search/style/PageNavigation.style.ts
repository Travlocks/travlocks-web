import clsx from 'clsx';

export const PageNavigationStyle = {
  container: 'flex items-center justify-center gap-[16px]',

  arrowButton: (cannotRender: boolean) =>
    clsx(
      'flex items-center justify-center w-[24px] h-[24px]',
      'cursor-pointer text-base-color-1',
      cannotRender && 'opacity-0 cursor-not-allowed',
    ),

  pageButton: (currentPage: boolean) =>
    clsx(
      'flex items-center justify-center w-[32px] h-[32px] rounded-[4px]',
      'b1 font-medium text-base-color-2 transition-colors duration-300',
      'cursor-pointer',
      currentPage && 'bg-primary-color text-base-color-6',
    ),
};
