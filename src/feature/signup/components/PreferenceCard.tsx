import clsx from 'clsx';
import type { ReactNode } from 'react';

type PreferenceCardProps = {
  label: string;
  description?: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
};

const PreferenceCard = ({ label, description, icon, isSelected, onClick }: PreferenceCardProps) => {
  return (
    <button
      type="button"
      aria-pressed={Boolean(isSelected)}
      onClick={onClick}
      className={clsx(
        'flex h-[114px] w-full flex-col items-center justify-center gap-1 rounded-[10px] border transition-colors',
        isSelected
          ? 'border-primary-color bg-[rgba(60,78,244,0.1)] text-primary-color'
          : 'border-base-color bg-base-color-6 text-base-color-0',
      )}>
      <span
        className={clsx(
          'flex size-[45px] items-center justify-center rounded-[10px] [&_svg]:size-[25px]',
          isSelected ? 'bg-primary-color text-white' : 'bg-base-color-4 text-base-color-2',
        )}>
        {icon}
      </span>
      <span className="text-[16px] font-medium leading-normal">{label}</span>
      {description && (
        <span
          className={clsx(
            'text-[10px] font-normal leading-normal',
            isSelected ? 'text-primary-color opacity-100' : 'opacity-0',
          )}>
          {description}
        </span>
      )}
    </button>
  );
};

export default PreferenceCard;
