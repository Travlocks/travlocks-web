import clsx from 'clsx';

export const SearchFilterStyle = {
  // container, wrapper
  container: clsx(
    'w-[302px] h-auto',
    'flex flex-col justify-between overflow-hidden',
    'rounded-[30px] bg-base-color-6 border border-base-color',
  ),

  wrapper: 'w-full h-full px-[28px] py-[20px] flex flex-col gap-[20px]',

  // line
  line: clsx('w-full h-[1px] bg-base-color', 'transition-all duration-300 ease-in-out overflow-hidden'),
  lineVisible: 'opacity-100 my-0',
  lineHidden: 'opacity-0 h-0 my-0',

  // header
  filterHeader: 'w-full p-[28px] flex items-center justify-between',
  filterHeaderTitle: 'h9 text-base-color-0',
  filterHeaderReset: 'b6 text-base-color-2 cursor-pointer',

  // section
  section: 'w-full flex flex-col gap-[16px]',
  sectionHeader: 'flex flex-row items-center justify-between',
  sectionTitle: 'h9 text-base-color-0',
  sectionArrow: 'transition-transform duration-300 cursor-pointer',
  sectionArrowOpen: 'rotate-180',
  sectionArrowClosed: 'rotate-0',

  // checkbox
  checkboxGroup: (hasTwoColumns: boolean) =>
    clsx(
      'flex flex-col gap-[12px]',
      'transition-all duration-300 ease-in-out overflow-hidden',
      hasTwoColumns && 'grid grid-cols-2 grid-flow-row',
    ),
  checkboxGroupHidden: 'max-h-0 opacity-0',
  checkboxGroupVisible: 'max-h-[1000px] opacity-100',

  checkboxItem: 'flex items-center gap-[12px] cursor-pointer',

  checkboxWrapper: 'relative flex items-center justify-center w-[23px] h-[23px]',

  checkbox: clsx(
    'peer appearance-none w-full h-full rounded-[5px] border border-base-color bg-base-color-6 cursor-pointer',
    'checked:border-primary-color checked:bg-primary-color',
  ),

  checkIcon: 'absolute text-white opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none',

  checkboxLabel: 'b5 text-base-color-0',
};
