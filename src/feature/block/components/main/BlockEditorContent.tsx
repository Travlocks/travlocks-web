import { IconBase } from '@/shared/ui/icon/IconBase';
import TriangleIcon from '@assets/blockEdit/icon-triangle.svg?react';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { useCallback, useState } from 'react';
import type { Block } from '../../types/block';
import type { DockHintState } from '../../types/drag';
import PuzzleBlock from '../ui/PuzzleBlock';
import BlockGhost from '../ui/BlockGhost';

const CANVAS_W = 1680;
const CANVAS_H = 2600;

interface BlockEditorContentProps {
  boardRef: React.RefObject<HTMLDivElement | null>;
  puzzleBlocks: Block[];
  dockHint: DockHintState;
}

const BlockEditorContent = ({ boardRef, puzzleBlocks, dockHint }: BlockEditorContentProps) => {
  // 임시용 날짜 관리
  const [day, setDay] = useState(1);
  const { setNodeRef, isOver } = useDroppable({
    id: 'block-board',
  });

  // 날짜 변경 핸들러
  const handleDayChange = (day: number) => {
    if (day < 1 || day > 5) return;
    setDay(day);
  };

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
      <div className="h-[79px] shrink-0 bg-white border-b border-base-color flex items-center justify-between px-8">
        <div className="flex items-center gap-5">
          {/* 왼쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors"
            onClick={() => handleDayChange(day - 1)}>
            <IconBase icon={TriangleIcon} className="rotate-180" />
          </button>

          <span className="text-[28px] font-semibold text-black leading-none">DAY {day}</span>

          {/* 오른쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors"
            onClick={() => handleDayChange(day + 1)}>
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
            {puzzleBlocks.map((block) => (
              <PuzzleBlock key={block.blockId} block={block} />
            ))}

            <BlockGhost hint={dockHint} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockEditorContent;
