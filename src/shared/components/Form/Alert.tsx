import clsx from 'clsx';

import { AppIcon } from '@shared/ui/icon/AppIcon';

interface AlertProps {
  text: string | React.ReactNode;
  type: 'check' | 'alert';
  width?: number;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

const Alert = ({ text, type, width, onClick, className, compact = false }: AlertProps) => {
  const iconSize = compact ? '17px' : '24px';

  const Icon =
    type === 'check' ? (
      <span className="flex size-[17px] shrink-0 items-center justify-center rounded-[10px] bg-primary-color">
        <AppIcon name="check" width="16px" height="16px" />
      </span>
    ) : (
      <AppIcon name="alert" width={iconSize} height={iconSize} color="#fd7565" />
    );

  return (
    <div
      className={clsx(
        'flex w-full items-center rounded-[5px] text-[16px] font-medium tracking-[-0.15px]',
        compact ? 'min-h-[43px] gap-3 px-5 py-3' : 'gap-2 px-6 py-[13px]',
        !width && !compact && 'max-w-[500px]',
        type === 'alert' && 'bg-[rgba(253,117,101,0.1)] text-negative',
        type === 'check' && 'bg-[rgba(60,78,244,0.1)] text-primary-color',
        className,
      )}
      style={{ maxWidth: width ?? (compact ? '100%' : undefined) }}>
      {Icon}

      {type === 'alert' && (
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
          <span className="min-w-0">{text}</span>
          {onClick && (
            <button
              type="button"
              onClick={onClick}
              className="shrink-0 text-[16px] font-medium underline cursor-pointer">
              재전송
            </button>
          )}
        </div>
      )}

      {type === 'check' && (
        <div className="flex w-full items-center justify-between gap-4">
          <span>{text}</span>
          {onClick && (
            <button
              type="button"
              onClick={onClick}
              className="shrink-0 text-[16px] font-medium underline cursor-pointer">
              재전송
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Alert;
