import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';
import { MOCK_BLOCKS } from '../mock';
import { useBlockEditor } from '../hooks/useBlockEditor';
import { useBlockDrag } from '../hooks/useBlockDrag';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import BlockItem from './side/BlockItem';
import { useState } from 'react';
import { scaleDragByZoom } from '../utils/board';

const BlockEditor = () => {
  const { puzzleBlocks, currentDay, actions: editorActions } = useBlockEditor();
  const [zoom, setZoom] = useState(1);
  const { sensors, boardRef, activeDrag, dockHint, handlers } = useBlockDrag({
    puzzleBlocks,
    currentDay,
    updateBlocksByDay: editorActions.updateBlocksByDay,
    removeById: editorActions.removeById,
  });

  return (
    <DndContext sensors={sensors} modifiers={[scaleDragByZoom(zoom)]} {...handlers}>
      <div className="flex h-full w-full overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-[302px] h-full shrink-0 relative z-above">
          <BlockSidebar items={MOCK_BLOCKS} />
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 h-full min-w-0">
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
        {/* {activeDrag?.type === 'blockEditor' && (
          // TODO: 여기에 드래그하면서 보여지는 퍼즐 컴포넌트
        )} */}
      </DragOverlay>
    </DndContext>
  );
};

export default BlockEditor;
