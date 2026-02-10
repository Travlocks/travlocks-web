import { useDroppable } from '@dnd-kit/core';
import { useCallback } from 'react';
import clsx from 'clsx';
import { IconBase } from '@/shared/ui/icon/IconBase';
import TriangleIcon from '@feature/block/blockBuild/assets/edit-icon-triangle.svg?react';
import AISortButton from '@/feature/block/blockBuild/components/ui/AISortButton';
import type { Block } from '../../types/block';
import type { DockHintState } from '../../types/drag';
import PuzzleBlock from '../ui/PuzzleBlock';
import BlockGhost from '../ui/BlockGhost';
import BlockStartNode from '../ui/BlockStartNode';
// import BlockTrash from './BlockTrash';
import BlockUndoRedo from './BlockUndoRedo';
import { useCanvasPanZoom } from '@/shared/hooks/useCanvasPanZoom';
import BlockTrash from './BlockTrash';

const CANVAS_W = 1680;
const CANVAS_H = 2600;

// 가상 캔버스 패딩
const PAD = 2000;
const VIRTUAL_W = CANVAS_W + PAD * 2;
const VIRTUAL_H = CANVAS_H + PAD * 2;

const START_ID = 0;

interface BlockEditorContentProps {
  boardRef: React.MutableRefObject<HTMLDivElement | null>;
  puzzleBlocks: Block[];
  dockHint: DockHintState;
  currentDay: number;
  onDayChange: (day: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  draggingBlockIds?: number[];
}

const BlockEditorContent = ({
  boardRef,
  puzzleBlocks,
  dockHint,
  currentDay,
  onDayChange,
  zoom,
  onZoomChange,
  draggingBlockIds = [],
}: BlockEditorContentProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'block-board',
  });

  const { viewportRef, isPanning, spaceDown, handlers } = useCanvasPanZoom({
    zoom,
    onZoomChange,
    enableBackgroundPan: true,
    panIgnoreSelector: '[data-pan-ignore]',
    enableSpacePan: true,
    initialScroll: () => ({ left: PAD * zoom, top: PAD * zoom }),
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
      viewportRef.current = node;
    },
    [setNodeRef, boardRef, viewportRef],
  );

  return (
    <div className="relative flex flex-col w-full h-full bg-[#F8FAFC]">
      {/* 1. 상단 헤더 */}
      <div className="h-[79px] shrink-0 bg-base-color-6 border-b border-base-color flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          {/* 왼쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors cursor-pointer p-3"
            onClick={() => handleDayChange(currentDay - 1)}>
            <IconBase icon={TriangleIcon} className="w-2.5 h-2.5 rotate-180" />
          </button>

          <span className="text-[28px] font-medium text-black leading-none">DAY {currentDay}</span>

          {/* 오른쪽 화살표 */}
          <button
            className="text-base-color-0 hover:text-gray-600 transition-colors cursor-pointer p-3"
            onClick={() => handleDayChange(currentDay + 1)}>
            <IconBase icon={TriangleIcon} className="w-2.5 h-2.5" />
          </button>
        </div>

        <span className="text-base-color-1 h9 font-light">마우스로 블록을 드래그하여 일정을 조립하세요</span>
      </div>

      {/* 2. 메인 캔버스 영역 (드롭존) */}
      {/* h-[1200px] -> 편집 섹션 높이 */}
      <div className="flex-1 min-h-0 h-[1200px] relative">
        {/* Redo, Undo 버튼 */}
        <div data-pan-ignore className="absolute top-[15px] right-8 z-content">
          <BlockUndoRedo />
        </div>
        <div
          ref={setRefs}
          {...handlers}
          onPointerLeave={handlers.onPointerUp}
          className={clsx(
            'h-full w-full overflow-auto overscroll-contain relative transition-colors duration-150',
            isOver ? 'bg-blue-50/30' : 'bg-[#F8FAFC]',
            isPanning ? 'cursor-grabbing' : spaceDown ? 'cursor-grab' : 'cursor-default',
          )}>
          <div className="relative" style={{ width: VIRTUAL_W * zoom, height: VIRTUAL_H * zoom }}>
            {/* 3) 실제 Canvas (보드) */}
            <div
              className="relative origin-top-left"
              style={{
                width: VIRTUAL_W,
                height: VIRTUAL_H,
                transform: `scale(${zoom})`,
              }}>
              <div className="absolute" style={{ left: PAD, top: PAD, width: CANVAS_W, height: CANVAS_H }}>
                {puzzleBlocks.map((block) => {
                  const isStart = block.blockId === START_ID;
                  if (isStart) {
                    return <BlockStartNode key={block.blockId} block={block} />;
                  }
                  // 드래그 중인 블록과 자손들은 숨김 (DOM에서 유지하여 위치 점프 방지)
                  const isHidden = draggingBlockIds.includes(block.blockId);
                  return <PuzzleBlock key={block.blockId} block={block} canDrag isHidden={isHidden} />;
                })}

                <BlockGhost hint={dockHint} />
              </div>
            </div>
          </div>
        </div>
        {/* 블록 삭제 드래그 영역 */}
        <div data-pan-ignore className="absolute bottom-11 right-10 p-2">
          <BlockTrash />
        </div>

        {/* AI 스마트 정렬 버튼 */}
        <div data-pan-ignore className="absolute left-1/2 bottom-12 -translate-x-1/2 z-sticky">
          <AISortButton />
        </div>
      </div>
    </div>
  );
};

export default BlockEditorContent;
