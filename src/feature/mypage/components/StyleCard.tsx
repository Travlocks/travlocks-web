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
        'flex flex-col items-center justify-center gap-1.25 w-full h-[159px] px-11.5 py-5 rounded-[10px] border transition-all cursor-pointer',
        isSelected
          ? 'border-primary-color bg-primary-color/5'
          : 'border-base-color-3 bg-base-color-6 hover:border-base-color-2',
        className,
      )}>
      <div className="w-8 h-8 rounded-[10px] bg-base-color-4 flex items-center justify-center">
        <div className={clsx('w-6.25 h-6.25', isSelected ? 'text-primary-color' : 'text-base-color-0')}>{icon}</div>
      </div>
      <span
        className={clsx(
          'b6 text-center leading-6 tracking-[-0.3125px]',
          isSelected ? 'text-primary-color' : 'text-base-color-0',
        )}>
        {label}
      </span>
    </button>
  );
};

export default StyleCard;
