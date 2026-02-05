import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';
import { MOCK_BLOCKS } from '../mock';
import { useBlockEditor } from '../hooks/useBlockEditor';
import { useBlockDrag } from '../hooks/useBlockDrag';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import BlockItem from './side/BlockItem';
import PuzzleBlock from './ui/PuzzleBlock';
import { useState } from 'react';
import BlockTimeLine from '../../blockTimeLine/BlockTimeLine';

const BlockEditor = () => {
  const { puzzleBlocks, currentDay, actions: editorActions } = useBlockEditor();
  const [zoom, setZoom] = useState(1);
  const PAD = 2000;

  const { sensors, boardRef, activeDrag, dockHint, handlers } = useBlockDrag({
    puzzleBlocks,
    currentDay,
    updateBlocksByDay: editorActions.updateBlocksByDay,
    removeById: editorActions.removeById,
    zoom,
    pad: PAD,
  });

  return (
    // modifier 제거: 모든 좌표 계산은 calcCandidate에서 일관되게 처리
    <DndContext sensors={sensors} {...handlers}>
      <div className="flex h-full w-full overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-[302px] h-full shrink-0 relative z-above">
          <BlockSidebar items={MOCK_BLOCKS} />
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 h-full min-w-0">
          {/* 처음 렌더링 시 타임라인 */}
          <BlockTimeLine />

          <BlockEditorContent
            boardRef={boardRef}
            puzzleBlocks={puzzleBlocks}
            dockHint={dockHint}
            currentDay={currentDay}
            onDayChange={editorActions.setDay}
            zoom={zoom}
            onZoomChange={setZoom}
          />
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDrag?.type === 'blockSidebar' && <BlockItem item={activeDrag.block} />}
        {activeDrag?.type === 'blockEditor' &&
          (() => {
            const block = puzzleBlocks.find((b) => b.blockId === activeDrag.blockId);
            return block ? <PuzzleBlock block={block} isOverlay zoom={zoom} /> : null;
          })()}
      </DragOverlay>
    </DndContext>
  );
};

export default BlockEditor;
