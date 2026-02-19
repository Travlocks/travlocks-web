import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';
import { useBlockEditor } from '../hooks/useBlockEditor';
import { useBlockDrag } from '../hooks/useBlockDrag';
import { useBlockSync } from '../hooks/useBlockSync';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import BlockItem from './side/BlockItem';
import PuzzleBlock from './ui/PuzzleBlock';
import BlockTimeLine from '../../blockTimeLine/BlockTimeLine';
import BlockItemUI from '@/shared/components/Block/BlockItemUI';
import type { Level } from '../types/level';
import { type SetStateAction, useMemo, useRef, useState } from 'react';
import { useBlockUndoRedo } from '../hooks/useBlockUndoRedo';
import { getDescendantBlocks, getDescendants } from '../utils/path';
import VlockModal from '@/feature/block/vlockModal/VlockModal';
import type { VlockData, VlockModalRequestDto } from '@/feature/block/vlockModal/types/vlockModal.types';
import type { CategoryType, SidebarBlock } from '../types/block';
import { VLOCK_CATEGORY_MAP } from '@/shared/constants/vlockCategory';
import { MOCK_BLOCKS } from '../mock';
import { deriveConnectedConnectorEdgeMap } from '../utils/connectedConnectorEdges';

interface BlockEditorProps {
  level: Level;
  setLevel: React.Dispatch<SetStateAction<Level>>;
  onSummaryUpdatingChange?: (isUpdating: boolean) => void;
}

const mapVlockToSidebarBlock = (vlock: VlockData): SidebarBlock => {
  return {
    id: vlock.id,
    name: vlock.name,
    category: (VLOCK_CATEGORY_MAP[vlock.vlockCategory.id as keyof typeof VLOCK_CATEGORY_MAP] as CategoryType) || '기타',
    duration: vlock.vlockCategory.stayHours ? `${vlock.vlockCategory.stayHours}시간` : '1시간',
    imageUrl: vlock.coverImgUrl,
  };
};

const BlockEditor = ({ level, setLevel, onSummaryUpdatingChange }: BlockEditorProps) => {
  const { puzzleBlocks, currentDay, tripDays, actions: editorActions } = useBlockEditor();
  const connectedEdgeMap = useMemo(() => deriveConnectedConnectorEdgeMap(puzzleBlocks), [puzzleBlocks]);
  const [zoom, setZoom] = useState(1);
  const [blockItems, setBlockItems] = useState<SidebarBlock[]>(MOCK_BLOCKS);
  const [activeVlockModal, setActiveVlockModal] = useState<{
    type: 'create' | 'edit';
    vlockId?: number;
    data?: VlockModalRequestDto;
    cityId?: number;
  } | null>(null);
  const PAD = 2000;
  const isSyncPausedRef = useRef(false);

  const { trackedUpdateBlocksByDay, trackedRemoveById, onDragStateChange, handleUndo, handleRedo, canUndo, canRedo } =
    useBlockUndoRedo({
      puzzleBlocks,
      currentDay,
      updateBlocksByDay: editorActions.updateBlocksByDay,
      removeById: editorActions.removeById,
      isSyncPausedRef,
    });

  const { sensors, boardRef, activeDrag, dockHint, handlers } = useBlockDrag({
    puzzleBlocks,
    currentDay,
    updateBlocksByDay: trackedUpdateBlocksByDay,
    removeById: trackedRemoveById,
    zoom,
    pad: PAD,
    onDragStateChange,
  });

  // 서버 동기화 (디바운스 + 롤백)
  useBlockSync({ onSummaryUpdatingChange, isSyncPausedRef });

  return (
    <DndContext sensors={sensors} {...handlers}>
      <div className="flex h-full w-full overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-[302px] h-full shrink-0 relative z-above">
          <BlockSidebar items={blockItems} onOpenVlockModal={(config) => setActiveVlockModal(config)} />
        </aside>

        <main className="flex-1 h-full min-w-0">
          {/* 처음 렌더링 시 타임라인 */}
          {level === 'timeline' && <BlockTimeLine setLevel={setLevel} />}

          {level === 'editor' && (
            <div className="h-[1091px]">
              <BlockEditorContent
                boardRef={boardRef}
                puzzleBlocks={puzzleBlocks}
                dockHint={dockHint}
                currentDay={currentDay}
                tripDays={tripDays}
                onDayChange={editorActions.setDay}
                zoom={zoom}
                onZoomChange={setZoom}
                draggingBlockIds={
                  activeDrag?.type === 'blockEditor'
                    ? [activeDrag.blockId, ...getDescendants(puzzleBlocks, activeDrag.blockId)]
                    : []
                }
                onUndo={handleUndo}
                onRedo={handleRedo}
                canUndo={canUndo}
                canRedo={canRedo}
              />
            </div>
          )}

          {activeVlockModal && (
            <VlockModal
              type={activeVlockModal.type}
              vlockId={activeVlockModal.vlockId}
              data={activeVlockModal.data}
              cityId={activeVlockModal.cityId}
              onClose={() => setActiveVlockModal(null)}
              onSuccess={(data) => {
                setActiveVlockModal(null);
                if (data) {
                  const newBlock = mapVlockToSidebarBlock(data);
                  setBlockItems((prev) => [...prev, newBlock]);
                }
              }}
            />
          )}
        </main>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeDrag?.type === 'blockSidebar' && <BlockItem item={activeDrag.block} />}
        {activeDrag?.type === 'blockEditor' &&
          (() => {
            const block = puzzleBlocks.find((b) => b.blockId === activeDrag.blockId);
            if (!block) return null;

            // 자손 블록들 조회
            const descendants = getDescendantBlocks(puzzleBlocks, activeDrag.blockId);
            const allBlocks = [block, ...descendants];

            // 바운딩 박스 계산
            const minX = Math.min(...allBlocks.map((b) => b.x));
            const minY = Math.min(...allBlocks.map((b) => b.y));
            const maxX = Math.max(...allBlocks.map((b) => b.x + b.w));
            const maxY = Math.max(...allBlocks.map((b) => b.y + b.h));

            return (
              <div
                className="relative"
                style={{
                  width: (maxX - minX) * zoom,
                  height: (maxY - minY) * zoom,
                }}>
                {allBlocks.map((b) => (
                  <div
                    key={b.blockId}
                    className="absolute"
                    style={{
                      left: (b.x - minX) * zoom,
                      top: (b.y - minY) * zoom,
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left',
                    }}>
                    <PuzzleBlock
                      block={b}
                      connectedPlugEdgeIndex={connectedEdgeMap.get(b.blockId)?.connectedPlugEdgeIndex ?? null}
                      connectedSocketEdgeIndex={connectedEdgeMap.get(b.blockId)?.connectedSocketEdgeIndex ?? null}
                      isOverlay
                    />
                  </div>
                ))}
              </div>
            );
          })()}
        {activeDrag?.type === 'blockTimeline' && <BlockItemUI item={activeDrag.block} />}
      </DragOverlay>
    </DndContext>
  );
};

export default BlockEditor;
