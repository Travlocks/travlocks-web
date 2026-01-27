import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';
import { MOCK_BLOCKS } from '../mock';
import { useBlockDrag } from '../hooks/useBlockDrag';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import BlockItem from './side/BlockItem';

const BlockEditor = () => {
  const { sensors, boardRef, activeDrag, puzzleBlocks, dockHint, handlers } = useBlockDrag();

  return (
    <DndContext sensors={sensors} {...handlers}>
      <div className="flex h-full w-full overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-[302px] h-full shrink-0 relative z-above">
          <BlockSidebar items={MOCK_BLOCKS} />
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 h-full min-w-0">
          <BlockEditorContent boardRef={boardRef} puzzleBlocks={puzzleBlocks} dockHint={dockHint} />
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDrag?.type === 'blockSidebar' && <BlockItem item={activeDrag.block} />}
        {activeDrag?.type === 'blockEditor' && (
          // TODO: 여기에 드래그하면서 보여지는 퍼즐 컴포넌트
          <div
            className="rounded-xl p-4 shadow-xl opacity-90"
            style={{ width: activeDrag.w, height: activeDrag.h }}></div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default BlockEditor;
