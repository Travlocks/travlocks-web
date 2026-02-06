import clsx from 'clsx';

export const SearchBarStyle = {
  container: 'relative w-full max-w-[1130px] flex items-center justify-center',

  searchIconWrapper: 'w-[30px] absolute left-[40px] top-1/2 -translate-y-1/2 pointer-events-none',

  searchIcon: 'w-[30px] aspect-square text-base-color-3',

  input: clsx(
    'w-[1130px] p-[32px_40px_32px_86px]',
    'h3 text-base-color-0',
    'rounded-[30px] bg-base-color-6',
    'border-gradient-focus',
  ),
};
