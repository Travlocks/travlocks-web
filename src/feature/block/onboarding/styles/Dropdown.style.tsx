import clsx from 'clsx';

export const DropdownStyle = {
  inputField: clsx(
    'h-[53px] w-full p-[16px]',
    'inline-flex items-center',
    'rounded-[5px] border border-base-color bg-base-color-6',
    'cursor-pointer',
  ),

  placeholder: 'b4 text-base-color-2',
  selectedText: 'b4 text-base-color-0',

  dropdownContainer: clsx(
    'absolute top-[100%] left-0 z-dropdown',
    'w-full',
    'inline-flex flex-col justify-center items-start',
    'rounded-[5px] border border-base-color bg-base-color-6',
  ),

  menuItem: (isSelected: boolean) =>
    clsx(
      'w-full p-[17px_20px]',
      'inline-flex items-center',
      'cursor-pointer',
      isSelected ? 'text-base-color-0' : 'text-base-color-3',
    ),

  dorpdownIcon: (isOpen: boolean) =>
    clsx('w-[11px] h-[7px]', 'transition-transform duration-200', isOpen && 'rotate-180'),

  backIconWrapper: 'w-[20px] h-[20px] p-[4px] flex justify-center items-center',

  backIcon: 'cursor-pointer',

  deleteIconWrapper:
    'w-[20px] h-[20px] flex items-center justify-center p-[4px] rounded-[10px] bg-base-color-6 cursor-pointer',

  deleteIcon: 'w-[10px] h-[10px] text-primary-color',

  button: clsx(
    'p-[16px_28px]',
    'flex items-center justify-center',
    'rounded-[5px] border border-base-color bg-base-color-6',
    'text-base-color-3 b4',
    'cursor-pointer',
    'hover:border-primary-color',
    'hover:bg-[var(--Primary-color,rgba(60,78,244,0.10))]',
    'hover:text-primary-color',
    'transition-all duration-200',
    'w-fit whitespace-nowrap',
  ),

  header: 'flex items-center gap-[6px] b4 text-base-color-1',

  tag: clsx(
    'p-[8px_16px]',
    'flex flex-row gap-[8px] justify-center items-center',
    'rounded-[20px] bg-primary-color',
    'text-base-color-6 h9',
    'whitespace-nowrap flex-shrink-0',
    'z-sticky',
  ),
};
