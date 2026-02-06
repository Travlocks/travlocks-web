import type { DragStartEvent, DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useCallback, useRef, useState, useEffect } from 'react';
import type { Block, SidebarBlock } from '../types/block';
import type { ActiveDrag, DockHintState, DragType } from '../types/drag';
import { getTailIdFromBlocks } from '../utils/path';
import { commitEditorDrop, commitSidebarDrop, detachTail } from '../utils/commit';
import { calcCandidate } from '../utils/boardCandidate';
import { buildDockHint, computeSnapDecision } from '../utils/dockHint';
import { arrayMove } from '@dnd-kit/sortable';
import { convertSidebarToBlock } from '../utils/convertSidebarToBlock';

const DEFAULT_BLOCK = { w: 125, h: 125 };
const GRID = 40;
const START_ID = 0;
const SNAP_THRESHOLD = 67;

interface UseBlockDragParams {
  puzzleBlocks: Block[];
  currentDay: number;
  updateBlocksByDay: (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => void;
  removeById: (blockId: number) => void;
  zoom: number;
  pad: number;
}

export const useBlockDrag = ({
  puzzleBlocks,
  currentDay,
  updateBlocksByDay,
  removeById,
  zoom,
  pad,
}: UseBlockDragParams) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const boardRef = useRef<HTMLDivElement | null>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [dockHint, setDockHint] = useState<DockHintState>(null);

  // 항상 최신 상태를 참조하기 위한 ref
  const puzzleBlocksRef = useRef(puzzleBlocks);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    puzzleBlocksRef.current = puzzleBlocks;
  }, [puzzleBlocks]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const type = e.active.data.current?.type as DragType | undefined;

      if (type === 'blockSidebar') {
        const item = e.active.data.current?.item as SidebarBlock | undefined;
        if (item) setActiveDrag({ type: 'blockSidebar', block: item });
      }

      if (type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number;
        const currentBlocks = puzzleBlocksRef.current;
        const targetBlock = currentBlocks.find((b) => b.blockId === blockId);

        if (targetBlock) {
          setActiveDrag({
            type: 'blockEditor',
            blockId,
            points: targetBlock.points,
            connectors: targetBlock.connectors,
            color: targetBlock.color,
          });

          updateBlocksByDay((prev) => {
            const blocksForDay = prev[currentDay] ?? [];
            return {
              ...prev,
              [currentDay]: detachTail({ blocks: blocksForDay, startId: START_ID, movingId: blockId }),
            };
          });
        }
      }

      if (type === 'blockTimeline') {
        const item = e.active.data.current?.block as SidebarBlock | undefined;

        if (item)
          setActiveDrag({
            type: 'blockTimeline',
            block: item,
          });
      }
    },
    [currentDay, updateBlocksByDay],
  );

  const onDragMove = useCallback(
    (e: DragMoveEvent) => {
      const boardEl = boardRef.current;
      if (!boardEl) return;

      const isOverBoard = e.over?.id === 'block-board';
      if (!isOverBoard) {
        setDockHint(null);
        return;
      }

      const currentBlocks = puzzleBlocksRef.current;
      const currentZoom = zoomRef.current;

      const candidate = calcCandidate({ e, boardEl, defaultSize: DEFAULT_BLOCK, grid: GRID, zoom: currentZoom, pad });
      if (!candidate) return;

      const tailId = getTailIdFromBlocks(currentBlocks, START_ID) ?? START_ID;
      const tail = currentBlocks.find((b) => b.blockId === tailId) ?? null;

      const decision = computeSnapDecision({
        candidate,
        tail,
        threshold: SNAP_THRESHOLD,
      });

      setDockHint(buildDockHint({ candidate, decision }));
    },
    [pad],
  );

  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveDrag(null);
      setDockHint(null);

      const overId = e.over?.id;
      const type = e.active.data.current?.type as DragType | undefined;

      const currentBlocks = puzzleBlocksRef.current;
      const currentZoom = zoomRef.current;

      // 타임라인 내부에서 순서 정렬할 때
      if (type === 'blockTimeline') {
        const day = e.active.data.current?.day;
        if (!e.over) return;

        updateBlocksByDay((prev) => {
          const items = prev[day];

          const oldIdx = items.findIndex((b) => b.blockId === e.active.id);
          const newIDx = items.findIndex((b) => b.blockId === overId);

          return {
            ...prev,
            [day]: arrayMove(items, oldIdx, newIDx),
          };
        });
      }

      if (overId === 'blockTrash' && type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number | undefined;
        if (blockId != null) removeById(blockId);
        return;
      }

      if (String(overId)?.startsWith('timeline-')) {
        if (type !== 'blockSidebar') return;

        const day = Number(String(overId).split('-').pop());

        if (type === 'blockSidebar') {
          const item = e.active.data.current?.item as SidebarBlock | undefined;
          if (!item) return;

          const newBlock = convertSidebarToBlock(item);

          updateBlocksByDay((prev) => ({
            ...prev,
            [day]: [...(prev[day] ?? []), newBlock],
          }));
        }

        return;
      }

      if (overId !== 'block-board') return;

      const boardEl = boardRef.current;
      if (!boardEl) return;

      const candidate = calcCandidate({ e, boardEl, defaultSize: DEFAULT_BLOCK, grid: GRID, zoom: currentZoom, pad });
      if (!candidate) return;

      const tailId = getTailIdFromBlocks(currentBlocks, START_ID) ?? START_ID;
      const tail = currentBlocks.find((b) => b.blockId === tailId) ?? null;

      const decision = computeSnapDecision({
        candidate,
        tail,
        threshold: SNAP_THRESHOLD,
      });

      if (type === 'blockSidebar') {
        const item = e.active.data.current?.item as SidebarBlock | undefined;
        if (!item) return;

        updateBlocksByDay((prev) => ({
          ...prev,
          [currentDay]: commitSidebarDrop({
            blocks: prev[currentDay] ?? [],
            tpl: item,
            candidate,
            decision,
            startId: START_ID,
          }),
        }));
      }

      if (type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number | undefined;
        if (!blockId) return;

        updateBlocksByDay((prev) => ({
          ...prev,
          [currentDay]: commitEditorDrop({
            blocks: prev[currentDay] ?? [],
            movingId: blockId,
            candidate,
            decision,
            startId: START_ID,
          }),
        }));
      }
    },
    [currentDay, updateBlocksByDay, removeById, pad],
  );

  const onDragCancel = useCallback(() => {
    setActiveDrag(null);
    setDockHint(null);
  }, []);

  return {
    sensors,
    boardRef,
    activeDrag,
    dockHint,
    handlers: { onDragStart, onDragMove, onDragEnd, onDragCancel },
  };
};
