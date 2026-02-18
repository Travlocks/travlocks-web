import PuzzleIcon from '@assets/block/icon-summary-puzzle.svg?react';
import TimeIcon from '@assets/block/icon-summary-time.svg?react';
import CarIcon from '@assets/block/icon-summary-car.svg?react';

interface SummaryCardProps {
  data: {
    totalVlocks: number;
    totalDurationMinutes: number;
    totalMoveMinutes: number;
  };
  isUpdating?: boolean;
}

const formatDuration = (totalMinutes: number): string => {
  const safeMinutes = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
};

const SummaryCard = ({ data, isUpdating = false }: SummaryCardProps) => {
  const Card = [
    {
      key: 'total',
      icon: <PuzzleIcon />,
      text: '총 블록 수',
      value: `${data.totalVlocks}개`,
    },
    {
      key: 'stay',
      icon: <TimeIcon />,
      text: '예상 총 소요 시간',
      value: formatDuration(data.totalDurationMinutes),
    },
    {
      key: 'move',
      icon: <CarIcon />,
      text: '이동 시간 합계',
      value: formatDuration(data.totalMoveMinutes),
    },
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      {Card.map((item) => (
        <div key={item.key} className="flex gap-[20px] items-center">
          <div className="rounded-[10px] py-[9px] px-[10px] size-[50px] bg-[#E0E7FF] flex justify-center items-center">
            {item.icon}
          </div>

          <div className="flex flex-col gap-[3px]">
            <p className="text-primary-color b6">{item.text}</p>
            {isUpdating ? (
              <span
                className="h-[24px] rounded-[6px] bg-base-color opacity-70 animate-pulse"
                style={{ width: `${Math.max(item.value.length, 4)}ch` }}
              />
            ) : (
              <p className="h8">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
