import { AppIcon } from '@/shared/ui/icon/AppIcon';

interface BlockDurationBadgeProps {
  duration: string;
}

export const BlockDurationBadge = ({ duration }: BlockDurationBadgeProps) => {
  return (
    <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm w-fit">
      <AppIcon name="clock" width={14} height={14} className="text-[#3c4ef4]" />
      <span className="text-[#3c4ef4] text-[13px] font-bold leading-none pt-[1px]">{duration}</span>
    </div>
  );
};
