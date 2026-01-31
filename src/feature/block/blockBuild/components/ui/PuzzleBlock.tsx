import { useDraggable } from '@dnd-kit/core';
import type { Block as BlockData } from '../../types/block';
import { Block } from '@/shared/components/Block/Block';
import { createRectPoints } from '@/shared/components/Block/blockShape';

export default function PuzzleBlock({ block, canDrag }: { block: BlockData; canDrag: boolean }) {
  const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({
    id: `editor:${block.blockId}`,
    data: {
      type: 'blockEditor',
      blockId: block.blockId,
      startX: block.x,
      startY: block.y,
      w: block.w,
      h: block.h,
      connectors: block.connectors,
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
        isDragging ? 'z-50 opacity-80' : 'z-10',
      ].join(' ')}
      style={{
        left: block.x,
        top: block.y,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}>
      <Block
        title={block.name}
        category={block.category}
        duration={block.duration}
        points={createRectPoints(block.w, block.h)}
        connections={[
          { edgeIndex: 0, type: 'plug', align: 'center' },
          { edgeIndex: 2, type: 'socket', align: 'center' },
        ]}
      />
    </div>
  );
}
