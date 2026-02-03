import clsx from 'clsx';

export const SearchBarStyles = {
  container: clsx('relative m-auto max-w-[1130px]', 'flex items-center justify-center'),

  inputWrapper: clsx(
    'w-full p-[32px_40px]',
    'flex flex-row items-center gap-[16px]',
    'h3 text-base-color-0',
    'rounded-[30px] border border-base-color bg-base-color-6',
  ),

  searchIconWrapper: 'w-[30px] absolute left-[40px] top-1/2 -translate-y-1/2 pointer-events-none',

  searchIcon: 'w-[30px] aspect-square text-base-color-3',

  input: clsx(
    'w-full p-[32px_40px_32px_86px]',
    'h3 text-base-color-0',
    'rounded-[30px] bg-base-color-6',
    'border-gradient-focus',
  ),
};
