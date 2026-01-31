import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { type IconName } from '@/shared/ui/icon/registry';

interface BlockContentProps {
  icon: IconName;
  category: string;
  title: string;
}

export const BlockContent = ({ icon, category, title }: BlockContentProps) => {
  return (
    <div className="flex items-center gap-2 mt-1">
      <AppIcon name={icon} width={30} height={30} />
      <div className="flex flex-col">
        <span className="text-[12px] font-normal text-base-color-5">{category}</span>
        <span className="leading-tight b5">{title}</span>
      </div>
    </div>
  );
};
