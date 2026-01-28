import { type SidebarBlock } from '../../types/block';
import ClockIcon from '@assets/blockEdit/edit-icon-clock.svg?react';
import { blockItemStyles, categoryColor } from './block-styles';
import clsx from 'clsx';
import { useDraggable } from '@dnd-kit/core';

interface BlockItemProps {
  item: SidebarBlock;
}

const BlockItem = ({ item }: BlockItemProps) => {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `sidebar:${item.id}`,
    data: {
      type: 'blockSidebar',
      blockId: item.id,
      item,
    },
  });
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={clsx(
        'relative w-full h-[84px] rounded-[10px] border border-gray-200 bg-base-color-6 flex items-center gap-3 p-3',
        'cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md',
        isDragging && 'opacity-0',
      )}>
      {/* 이미지 영역 */}
      <div className="w-16 h-16 rounded-[10px] bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          // 빈 이미지 영역
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col items-start text-left">
        {/* 카테고리 */}
        <span
          className={blockItemStyles.smallText}
          style={{ color: categoryColor[item.category as keyof typeof categoryColor] }}>
          {item.category}
        </span>

        {/* 이름 */}
        <span className={blockItemStyles.title}>{item.name}</span>

        {/* 시간 */}
        <div className="flex items-center gap-1">
          <ClockIcon />
          <span className={clsx(blockItemStyles.smallText, blockItemStyles.time)}>{item.duration}</span>
        </div>
      </div>
    </button>
  );
};

export default BlockItem;
