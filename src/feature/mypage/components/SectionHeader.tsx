import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  className?: string;
  barColor?: 'primary' | 'secondary';
}

const SectionHeader = ({ title, className, barColor = 'primary' }: SectionHeaderProps) => {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div
        className={clsx('w-2.25 h-11.25 rounded-[2px]', barColor === 'primary' ? 'bg-primary-color' : 'bg-negative')}
      />
      <h2 className="h2 text-base-color-0">{title}</h2>
    </div>
  );
};

export default SectionHeader;
