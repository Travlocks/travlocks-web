import PinIcon from '@assets/icon-pin.svg?react';

interface DraftCardProps {
  title: string;
  region: string;
  progressRate: number;
  updatedAt: string;
}

const DraftCard = ({ title, region, progressRate, updatedAt }: DraftCardProps) => {
  return (
    <div className="group max-w-[589px] w-full h-[208px] rounded-[30px] border-base-color bg-base-color-6 shadow-[0_1px_20px_0_rgba(0,_0,_0,_0.15)] pt-[32px] px-[32px] pb-[28px] flex flex-col justify-between cursor-pointer">
      <div className="flex flex-col gap-[4px]">
        {/* 제목 */}
        <h2 className="text-base-color-0 b1 font-[600]">{title}</h2>

        {/* 위치 및 수정 날짜 */}
        <div className="flex gap-[20px] text-base-color-2 b3">
          <div className="flex gap-[3px]">
            <PinIcon />
            <p>{region}</p>
          </div>

          <p>·</p>

          <div>
            <p>{updatedAt.split('-').join('.')} 수정됨</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[8px]">
        <div className="flex justify-between">
          <p className="text-base-color-1 b3">진행 상황</p>
          <p className="text-primary-color b3">{progressRate}%</p>
        </div>

        {/* 진행선 */}
        <div className="group h-[10px] rounded-full bg-base-color relative overflow-hidden">
          <div
            className="absolute bg-primary-color inset-0 rounded-full group-hover:animate-progressFill origin-left"
            style={{ width: `${progressRate}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default DraftCard;
