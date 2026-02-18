import { useDndContext, useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import type { Block } from '../../blockBuild/types/block';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TimeLineBlockItem from './TimeLineBlockItem';

interface DayCardProps {
  day: number;
  items: Block[];
  onClick: () => void;
}

const DayCard = ({ day, items, onClick }: DayCardProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `timeline-${day}`,
  });

  const { active } = useDndContext();
  const isSidebarDragging = active?.data.current?.type === 'blockSidebar';

  return (
    <SortableContext items={items.map((b) => `${b.blockId}-${day}`)} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        onClick={onClick}
        className={clsx(
          'w-[288px] shrink-0 p-[22px] pt-[28px] min-h-[191px] h-max rounded-[20px] border border-base-color cursor-pointer',
          isSidebarDragging && isOver ? 'bg-[rgba(60,78,244,0.10)] border-primary-color' : 'bg-white',
        )}>
        <div className="flex flex-col gap-[28px] justify-center">
          <div className="flex justify-between">
            <p className="h8">DAY {day}</p>
            <div
              className={clsx(
                'rounded-full px-[10px] py-[4px] justify items-center justify-center',
                isSidebarDragging && isOver
                  ? 'bg-primary-color text-white'
                  : 'bg-[rgba(60,78,244,0.10)] text-primary-color',
              )}>
              {items.filter((item) => item.name !== 'START').length} Vlocks
            </div>
          </div>

          {items
            .filter((item) => item.name !== 'START')
            .map((item) => (
              <div key={item.blockId}>
                <TimeLineBlockItem key={item.blockId} block={item} day={day} />
              </div>
            ))}

          <div
            className={clsx(
              'flex items-center justify-center border rounded-[10px] border-base-color-3 border-dashed h-[91px]',
              isSidebarDragging && isOver && 'bg-white',
            )}>
            <p className="h8 text-base-color-3 text-[15px]">Vlock을 여기에 올려주세요</p>
          </div>
        </div>
      </div>
    </SortableContext>
  );
};

export default DayCard;
