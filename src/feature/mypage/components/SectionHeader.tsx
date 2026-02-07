import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  className?: string;
}

const SectionHeader = ({ title, className }: SectionHeaderProps) => {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div className="w-2.25 h-11.25 bg-primary-color rounded-sm" />
      <h2 className="h2 text-base-color-0">{title}</h2>
    </div>
  );
};

export default SectionHeader;
