import PuzzleIcon from '@assets/block/icon-summary-puzzle.svg?react';
import TimeIcon from '@assets/block/icon-summary-time.svg?react';
import CarIcon from '@assets/block/icon-summary-car.svg?react';

interface SummaryCardProps {
  data: {
    templateId: number;
    totalVlocks: number;
    totalStayMinutes: number;
    totalMoveMinutes: number;
  };
}

const SummaryCard = ({ data }: SummaryCardProps) => {
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
      value: `${Math.round(data.totalStayMinutes / 60)}시간`,
    },
    {
      key: 'move',
      icon: <CarIcon />,
      text: '이동 시간 합계',
      value: `${Math.round(data.totalMoveMinutes / 60)}시간`,
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
            <p className="h8">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCard;
