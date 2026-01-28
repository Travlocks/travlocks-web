import { IconBase } from '@/shared/ui/icon/IconBase';
import TriangleIcon from '@assets/blockEdit/edit-icon-triangle.svg?react';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { useCallback } from 'react';
import type { Block } from '../../types/block';
import type { DockHintState } from '../../types/drag';
import PuzzleBlock from '../ui/PuzzleBlock';
import BlockGhost from '../ui/BlockGhost';
import BlockStartNode from '../ui/BlockStartNode';
import { getTailIdFromBlocks } from '../../utils/path';

const CANVAS_W = 1680;
const CANVAS_H = 2600;

const START_ID = 0;

interface BlockEditorContentProps {
  boardRef: React.MutableRefObject<HTMLDivElement | null>;
  puzzleBlocks: Block[];
  dockHint: DockHintState;
  currentDay: number;
  onDayChange: (day: number) => void;
}

const BlockEditorContent = ({ boardRef, puzzleBlocks, dockHint, currentDay, onDayChange }: BlockEditorContentProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'block-board',
  });

  // 날짜 변경 핸들러
  const handleDayChange = (day: number) => {
    if (day < 1 || day > 5) return;
    onDayChange(day);
  };

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      boardRef.current = node;
    },
    [setNodeRef, boardRef],
  );

  const tailId = getTailIdFromBlocks(puzzleBlocks, START_ID) ?? START_ID;

  return (
    <div className="relative flex flex-col w-full h-full bg-[#F8FAFC]">
      {/* 1. 상단 헤더 */}
      <div className="h-[79px] shrink-0 bg-white border-b border-base-color flex items-center justify-between px-8">
        <div className="flex items-center gap-5">
          {/* 왼쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors cursor-pointer"
            onClick={() => handleDayChange(currentDay - 1)}>
            <IconBase icon={TriangleIcon} className="rotate-180" />
          </button>

          <span className="text-[28px] font-semibold text-black leading-none">DAY {currentDay}</span>

          {/* 오른쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors cursor-pointer"
            onClick={() => handleDayChange(currentDay + 1)}>
            <IconBase icon={TriangleIcon} />
          </button>
        </div>

        <span className="text-base-color-1 h9 font-medium">마우스로 블록을 드래그하여 일정을 조립하세요</span>
      </div>

      {/* 2. 메인 캔버스 영역 (드롭존) */}
      <div className="flex-1 min-h-0">
        <div
          ref={setRefs}
          className={clsx(
            'h-full w-full overflow-auto overscroll-contain relative transition-colors duration-150',
            isOver ? 'bg-blue-50/30' : 'bg-[#F8FAFC]',
          )}>
          {/* 3) 실제 Canvas (보드) */}
          <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
            {puzzleBlocks.map((block) => {
              const isStart = block.blockId === START_ID;
              if (isStart) {
                return <BlockStartNode key={block.blockId} block={block} />;
              }
              const isTail = block.blockId === tailId;
              // 드래그 규칙: free or tail 블록은 드래그 가능
              const canDrag = block.connectedFrom == null || isTail;
              return <PuzzleBlock key={block.blockId} block={block} canDrag={canDrag} />;
            })}

            <BlockGhost hint={dockHint} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockEditorContent;
