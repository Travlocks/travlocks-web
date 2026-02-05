import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

interface DayCardProps {
  day: number;
}

const DayCard = ({ day }: DayCardProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `timeline-droppable-${day}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        'w-[288px] shrink-0 p-[22px] pt-[28px] h-[191px] rounded-[20px] border border-base-color',
        isOver ? 'bg-[rgba(60,78,244,0.10)] border-primary-color' : 'bg-white',
      )}>
      <div className="flex flex-col gap-[28px] justify-center h-full">
        <div className="flex justify-between">
          <p className="h8">DAY {day}</p>
          <div className="rounded-full px-[10px] py-[4px] justify items-center justify-center bg-[rgba(60,78,244,0.10)] text-primary-color">
            0 Vlocks
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-1 items-center justify-center border rounded-[10px] border-base-color-3 border-dashed',
          )}>
          <p className="h8 text-base-color-3 text-[15px]">Vlock을 여기에 올려주세요</p>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
