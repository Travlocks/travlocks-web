import { useDraggable } from '@dnd-kit/core';
import type { Block as BlockData } from '../../types/block';
import { Block } from '@/shared/components/Block/Block';

interface PuzzleBlockProps {
  block: BlockData;
  canDrag?: boolean;
  isOverlay?: boolean;
  /** 상위 블록이 드래그될 때 true - DragOverlay에서 서브트리로 표시되므로 원본은 숨김 */
  isHidden?: boolean;
  zoom?: number;
}

export default function PuzzleBlock({
  block,
  canDrag = false,
  isOverlay = false,
  isHidden = false,
  zoom = 1,
}: PuzzleBlockProps) {
  // 오버레이 모드에서는 useDraggable 사용 안 함
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
    disabled: !canDrag || isOverlay,
  });

  // 오버레이 모드
  if (isOverlay) {
    return (
      <div className="select-none cursor-grabbing">
        <Block
          title={block.name}
          category={block.category}
          duration={block.duration}
          points={block.points}
          connections={block.connectors}
          color={block.color}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
        />
      </div>
    );
  }

  // 일반 모드 (캔버스 위 블록 - 컨테이너가 이미 scale(zoom) 적용됨)
  const dragProps = canDrag ? { ...listeners, ...attributes } : {};

  return (
    <div
      data-pan-ignore
      ref={setNodeRef}
      {...dragProps}
      className={[
        'absolute select-none cursor-grab active:cursor-grabbing',
        // 드래그 중이거나 숨겨진 상태일 때 완전히 숨김 - DragOverlay가 대신 표시됨
        isDragging || isHidden ? 'opacity-0 pointer-events-none' : 'z-10',
      ].join(' ')}
      style={{
        left: block.x,
        top: block.y,
        width: block.w,
        height: block.h,
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
