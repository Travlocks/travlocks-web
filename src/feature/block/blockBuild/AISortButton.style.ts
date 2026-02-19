import clsx from 'clsx';

export const AISortButtonStyles = {
  Root: (className?: string) =>
    clsx(
      'group relative inline-flex rounded-[10px] p-[1px] w-[455px] h-[98px]',
      'bg-[#E0E7FF]',
      'cursor-pointer overflow-hidden transition-all duration-300',
      'focus:outline-none',
      className,
    ),

  Background: () =>
    clsx('absolute inset-0 z-0', 'opacity-0 group-hover:opacity-100', 'transition-opacity duration-300 ease-in-out'),

  Inner: () =>
    clsx(
      'relative z-10 flex items-center gap-[15px]',
      'w-full h-full rounded-[9px] bg-base-color-6',
      'px-[30px] py-[25px]',
    ),
  IconWrapper: () => clsx('flex items-center justify-center', 'w-[46px] h-[46px]', 'rounded-[23px]', 'bg-[#E0E7FF]'),

  Icon: () =>
    clsx(
      'text-primary-color',
      'relative',
      '[&_.icon-default]:transition-opacity [&_.icon-default]:duration-300 [&_.icon-default]:ease-in-out',
      '[&_.icon-default]:opacity-100',
      'group-hover:[&_.icon-default]:opacity-0',
      '[&_.icon-gradient]:transition-opacity [&_.icon-gradient]:duration-300 [&_.icon-gradient]:ease-in-out',
      '[&_.icon-gradient]:opacity-0',
      'group-hover:[&_.icon-gradient]:opacity-100',
    ),

  TitleWrapper: () => clsx('relative h9 overflow-hidden'),

  TitleDefault: () => clsx('text-base-color-0', 'transition-opacity duration-300 ease-in-out', 'group-hover:opacity-0'),

  TitleHover: () =>
    clsx(
      'absolute inset-0',
      'opacity-0 group-hover:opacity-100',
      'transition-opacity duration-300 ease-in-out',
      'bg-[var(--background-image-gradient-color-hover)]',
      'bg-clip-text text-transparent',
      'whitespace-nowrap',
    ),

  Description: () => clsx('mt-[3px]', 'b6', 'text-base-color-2'),
};
