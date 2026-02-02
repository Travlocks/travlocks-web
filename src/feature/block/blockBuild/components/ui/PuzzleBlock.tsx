import { useDraggable } from '@dnd-kit/core';
import type { Block as BlockData } from '../../types/block';
import { Block } from '@/shared/components/Block/Block';

export default function PuzzleBlock({ block, canDrag }: { block: BlockData; canDrag: boolean }) {
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `editor:${block.blockId}`,
    data: {
      type: 'blockEditor',
      blockId: block.blockId,
      startX: block.x,
      startY: block.y,
      points: block.points,
      connectors: block.connectors,
      color: block.color,
    },
    disabled: !canDrag,
  });

  const dragProps = canDrag ? { ...listeners, ...attributes } : {};

  return (
    <div
      data-pan-ignore
      ref={setNodeRef}
      {...dragProps}
      className={[
        'absolute select-none cursor-grab active:cursor-grabbing',
        // 드래그 중일 때 완전히 숨김 - DragOverlay가 대신 표시됨
        isDragging ? 'opacity-0 pointer-events-none' : 'z-10',
      ].join(' ')}
      style={{
        left: block.x,
        top: block.y,
        width: block.w,
        height: block.h,
        // transform 제거 - DragOverlay 사용
      }}>
      <Block
        title={block.name}
        category={block.category}
        duration={block.duration}
        points={block.points}
        connections={block.connectors}
        color={block.color}
      />
    </div>
  );
}
