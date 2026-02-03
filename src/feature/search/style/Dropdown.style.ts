import clsx from 'clsx';

export const DropdownStyle = {
  container: 'relative w-[120px] inline-block',

  button: clsx(
    'flex flex-row items-center gap-[8px]',
    'p-[8px_16px]',
    'border rounded-[20px] border-base-color bg-base-color-6',
    'text-base-color-0 h9',
    'cursor-pointer',
  ),

  arrowIconWrapper: 'w-[20px] flex items-center justify-center',

  arrowIcon: (isOpen: boolean) =>
    clsx('w-[11px] h-[7px]', 'transition-transform duration-300 ease-in-out', isOpen ? 'rotate-180' : 'rotate-0'),

  menu: clsx(
    'w-full p-[14px_20px] absolute top-[calc(100% + 8px)] left-0 z-dropdown',
    'flex flex-col gap-[10px]',
    'border rounded-[20px] border-base-color bg-base-color-6',
  ),

  menuItem: (isActive: boolean) =>
    clsx('w-full rounded-[5px] cursor-pointer p-[4px_16px]', 'text-base-color-0 h9', isActive && 'bg-base-color-4'),
};
