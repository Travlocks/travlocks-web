import { useDraggable } from '@dnd-kit/core';
import type { Block } from '../../types/block';

export default function PuzzleBlock({ block, canDrag }: { block: Block; canDrag: boolean }) {
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
        width: block.w,
        height: block.h,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      }}>
      {/* TODO: 여기서 퍼즐 SVG 컴포넌트로 교체 */}
      <div className="w-full h-full rounded-xl bg-primary-color text-base-color-6 p-4">
        <div className="font-semibold">{block.name}</div>
        <div className="text-xs opacity-90">
          {block.category} · {block.duration}
        </div>
      </div>
    </div>
  );
}
