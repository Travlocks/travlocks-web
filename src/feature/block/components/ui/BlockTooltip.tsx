import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const BlockTooltip = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        'absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 w-max pointer-events-none transition-opacity duration-200',
        className,
      )}>
      {/* 말풍선 화살표 (Polygon) */}
      <div className="border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[8px] border-b-base-color-0" />
      {/* 말풍선 본문 */}
      <div className="bg-base-color-0 text-white text-[16px] px-3 py-2 rounded-lg -mt-px shadow-lg">{children} </div>
    </div>
  );
};

export default BlockTooltip;
