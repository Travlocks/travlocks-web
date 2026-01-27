import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';
import { MOCK_BLOCKS } from '../mock';
import { useBlockDrag } from '../hooks/useBlockDrag';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import BlockItem from './side/BlockItem';

const BlockEditor = () => {
  const { sensors, boardRef, activeDrag, puzzleBlocks, snapPreview, handlers } = useBlockDrag();

  return (
    <DndContext sensors={sensors} {...handlers}>
      <div className="flex h-full w-full">
        {/* 사이드바 */}
        <aside className="w-[302px] h-full shrink-0 relative z-10">
          <BlockSidebar items={MOCK_BLOCKS} />
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 h-full">
          <BlockEditorContent boardRef={boardRef} puzzleBlocks={puzzleBlocks} snapPreview={snapPreview} />
        </main>
      </div>

      {/* DragOverlay - 드래그 중 마우스를 따라다니는 블록 (z-index 문제 해결) */}
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
