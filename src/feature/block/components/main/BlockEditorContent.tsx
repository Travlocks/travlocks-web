import { IconBase } from '@/shared/ui/icon/IconBase';
import TriangleIcon from '@assets/blockEdit/icon-triangle.svg?react';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { useCallback } from 'react';
import type { Block } from '../../types/block';
import type { SnapPreviewsState } from '../../types/drag';
import PuzzleBlock from '../ui/PuzzleBlock';
import SnapPreview from '../ui/SnapPreview';

interface BlockEditorContentProps {
  boardRef: React.MutableRefObject<HTMLDivElement | null>;
  puzzleBlocks: Block[];
  snapPreview: SnapPreviewsState;
}

const BlockEditorContent = ({ boardRef, puzzleBlocks, snapPreview }: BlockEditorContentProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'block-board',
  });

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      boardRef.current = node;
    },
    [setNodeRef, boardRef],
  );

  return (
    <div className="relative flex flex-col w-full h-full bg-[#F8FAFC]">
      {/* 1. 상단 헤더 */}
      <div className="h-[79px] shrink-0 bg-white border-b border-[#D9D9D9] flex items-center justify-between px-8">
        <div className="flex items-center gap-5">
          {/* 왼쪽 화살표 */}
          <button className="text-base-color-0 hover:text-gray-600 transition-colors">
            <IconBase icon={TriangleIcon} className="rotate-180" />
          </button>

          <span className="text-[28px] font-semibold text-black leading-none">DAY 1</span>

          {/* 오른쪽 화살표 */}
          <button className="text-base-color-0 hover:text-gray-600 transition-colors">
            <IconBase icon={TriangleIcon} />
          </button>
        </div>

        <span className="text-base-color-1 h9 font-medium">마우스로 블록을 드래그하여 일정을 조립하세요</span>
      </div>

      {/* 2. 메인 캔버스 영역 (드롭존) */}
      <div className="relative h-screen">
        <div
          ref={setRefs}
          className={clsx(
            'w-full h-full overflow-y-auto overflow-x-hidden relative transition-colors duration-150',
            isOver ? 'bg-blue-50/30' : 'bg-[#F8FAFC]',
          )}>
          {puzzleBlocks.map((block) => (
            <PuzzleBlock key={block.blockId} block={block} />
          ))}

          {/* 스냅 프리뷰 */}
          <SnapPreview snapPreview={snapPreview} />
        </div>
      </div>
    </div>
  );
};

export default BlockEditorContent;
