import clsx from 'clsx';
import type { ReactNode } from 'react';

interface StyleCardProps {
  icon: ReactNode;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const StyleCard = ({ icon, label, isSelected = false, onClick, className }: StyleCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group w-full h-[159px] rounded-[10px] border pt-[20px] pb-[12px] px-[46px] flex flex-col justify-center items-center text-base-color-0 hover:bg-[rgba(60,78,244,0.10)] hover:border-primary-color hover:text-primary-color cursor-pointer transition-all duration-500',
        isSelected ? 'border-primary-color text-primary-color bg-[rgba(60,78,244,0.10)]' : 'border-base-color',
        className,
      )}>
      <div
        className={clsx(
          'size-[45px] rounded-[10px] flex items-center justify-center group-hover:bg-primary-color transition-all duration-500',
          isSelected ? 'bg-primary-color' : 'bg-base-color-4',
        )}>
        <div
          className={clsx(
            'w-[25px] h-[25px] text-base-color-0 transition-all duration-500',
            isSelected ? 'text-white' : 'group-hover:text-white',
          )}>
          {icon}
        </div>
      </div>
      <span className="text-[16px] font-[500] leading-[24px] tracking-[-0.312px] whitespace-nowrap">{label}</span>
    </button>
  );
};

export default StyleCard;
