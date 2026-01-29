import clsx from 'clsx';

interface Props {
  textKey: TooltipTextKey;
  className?: string;
}

type TooltipTextKey = '생성' | '타이틀' | '새로고침';

const TooltipText: Record<TooltipTextKey, string> = {
  생성: '생성 버튼을 눌러 나만의 블록을 만들어봐요!',
  타이틀: '타이틀을 누르면 타임라인 화면으로 돌아갈 수 있어요!',
  새로고침: '새로고침을 누르면 다른 블록들을 추천할게요!',
};

const BlockTooltip = ({ textKey, className }: Props) => {
  return (
    <div
      className={clsx(
        'absolute top-full mt-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-tooltip w-max pointer-events-none transition-opacity duration-200',
        className,
      )}>
      {/* 말풍선 화살표 (Polygon) */}
      <div className="border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[8px] border-b-base-color-0" />
      {/* 말풍선 본문 */}
      <div className="bg-base-color-0 text-base-color-6 text-b6 px-3 py-2 rounded-lg -mt-px shadow-lg">
        {TooltipText[textKey]}{' '}
      </div>
    </div>
  );
};

export default BlockTooltip;
