import clsx from 'clsx';

export const DropdownStyles = {
  inputField: clsx(
    'h-[53px] w-full p-[16px]',
    'inline-flex justify-between items-center',
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
};
