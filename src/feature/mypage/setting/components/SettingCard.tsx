import clsx from 'clsx';
import SectionHeader from '@/feature/mypage/components/SectionHeader';

interface SettingCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  barColor?: 'primary' | 'secondary';
}

const SettingCard = ({ title, children, className, cardClassName, barColor = 'primary' }: SettingCardProps) => {
  return (
    <section className={clsx('flex flex-col gap-7', className)}>
      <SectionHeader title={title} barColor={barColor} />
      <div
        className={clsx(
          'p-9 border rounded-[10px]',
          barColor === 'secondary' ? 'bg-negative-alertbox-fill border-negative' : 'bg-base-color-6 border-base-color',
          cardClassName,
        )}>
        {children}
      </div>
    </section>
  );
};

export default SettingCard;
