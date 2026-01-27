import type { DragStartEvent, DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useCallback, useRef, useState } from 'react';
import type { Block, SidebarBlock } from '../types/block';
import type { ActiveDrag, DockHintState, DragType } from '../types/drag';
import { getTailIdFromBlocks } from '../utils/path';
import { commitEditorDrop, commitSidebarDrop, detachTail } from '../utils/commit';
import { calcCandidate } from '../utils/boardCandidate';
import { buildDockHint, computeSnapDecision } from '../utils/dockHint';

const DEFAULT_BLOCK = { w: 260, h: 64 };
const GRID = 40;

const START_ID = 1;

const SNAP_THRESHOLD = 67;
const CONNECTOR_OFFSET = 0;
const ALLOW_BOTTOM = true;

// 임시 시작 블럭
const START_BLOCK: Block = {
  blockId: START_ID,
  name: 'START',
  category: '기타',
  duration: '',
  x: 44,
  y: 76,
  w: DEFAULT_BLOCK.w,
  h: DEFAULT_BLOCK.h,
  connectors: { input: null, output: 'right' },
  connectedTo: null,
  connectedFrom: null,
};

export const useBlockDrag = () => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  // 보드 참조
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [puzzleBlocks, setPuzzleBlocks] = useState<Block[]>([]);
  const [dockHint, setDockHint] = useState<DockHintState>(null);

  // 드래그 시작 후 블록 정보 설정
  const onDragStart = useCallback((e: DragStartEvent) => {
    const type = e.active.data.current?.type as DragType | undefined;

    if (type === 'blockSidebar') {
      const item = e.active.data.current?.item as SidebarBlock | undefined;
      if (item) {
        setActiveDrag({ type: 'blockSidebar', block: item });
      }
    }

    if (type === 'blockEditor') {
      const blockId = e.active.data.current?.blockId as number;
      const w = e.active.data.current?.w as number;
      const h = e.active.data.current?.h as number;
      const connectors = e.active.data.current?.connectors as Block['connectors'];
      if (blockId && w && h) {
        setActiveDrag({ type: 'blockEditor', blockId, w, h, connectors });
      }

      if (blockId !== null) {
        setPuzzleBlocks((prev) => detachTail({ blocks: prev, startId: START_ID, movingId: blockId }));
      }
    }
  }, []);

  // 드래그 중일 때 스냅 프리뷰 표시
  const onDragMove = useCallback(
    (e: DragMoveEvent) => {
      const boardEl = boardRef.current;
      if (!boardEl) return;

      const isOverBoard = e.over?.id === 'block-board';

      // 보드 위에 있을 때만 스냅 프리뷰 표시
      if (!isOverBoard) {
        setDockHint(null);
        return;
      }

      const candidate = calcCandidate({ e, boardEl, defaultSize: DEFAULT_BLOCK, grid: GRID });
      if (!candidate) return;

      const tailId = getTailIdFromBlocks(puzzleBlocks, START_ID) ?? START_ID;
      const tail = puzzleBlocks.find((b) => b.blockId === tailId) ?? null;

      const decision = computeSnapDecision({
        candidate,
        tail,
        threshold: SNAP_THRESHOLD,
        connectorOffset: CONNECTOR_OFFSET,
        allowBottom: ALLOW_BOTTOM,
      });

      setDockHint(buildDockHint({ candidate, decision }));
    },
    [puzzleBlocks],
  );

  // 드래그 종료 시 블록 정보 설정
  const onDragEnd = useCallback(
    (e: DragEndEvent) => {
      setActiveDrag(null);
      setDockHint(null);

      if (e.over?.id !== 'block-board') return;

      const boardEl = boardRef.current;
      if (!boardEl) return;

      const type = e.active.data.current?.type as DragType | undefined;

      const candidate = calcCandidate({
        e,
        boardEl,
        defaultSize: DEFAULT_BLOCK,
        grid: GRID,
      });
      if (!candidate) return;

      const tailId = getTailIdFromBlocks(puzzleBlocks, START_ID) ?? START_ID;
      const tail = puzzleBlocks.find((b) => b.blockId === tailId) ?? null;
      const decision = computeSnapDecision({
        candidate,
        tail,
        threshold: SNAP_THRESHOLD,
        connectorOffset: CONNECTOR_OFFSET,
        allowBottom: ALLOW_BOTTOM,
      });

      // 1) Sidebar -> Board 생성
      if (type === 'blockSidebar') {
        const item = e.active.data.current?.item as SidebarBlock | undefined;
        if (!item) return;

        setPuzzleBlocks((prev) =>
          commitSidebarDrop({ blocks: prev, tpl: item, candidate, decision, startId: START_ID }),
        );
        return;
      }

      // 2) Editor 블록 이동 커밋
      if (type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number | undefined;
        if (!blockId) return;

        setPuzzleBlocks((prev) =>
          commitEditorDrop({ blocks: prev, movingId: blockId, candidate, decision, startId: START_ID }),
        );
      }
    },
    [puzzleBlocks],
  );

  // 드래그 취소 시 블록 정보 초기화
  const onDragCancel = useCallback(() => {
    setActiveDrag(null);
    setDockHint(null);
  }, []);

  return {
    sensors,
    boardRef,
    activeDrag,
    puzzleBlocks,
    dockHint,
    actions: {
      setPuzzleBlocks,
      reset: () => setPuzzleBlocks([START_BLOCK]),
      removeById: (blockId: number) =>
        setPuzzleBlocks((prev) => prev.filter((block) => block.blockId !== blockId && block.blockId !== START_ID)),
      updateBlock: (blockId: number, updates: Partial<Block>) =>
        setPuzzleBlocks((prev) => prev.map((block) => (block.blockId === blockId ? { ...block, ...updates } : block))),
    },
    handlers: { onDragStart, onDragMove, onDragEnd, onDragCancel },
  };
};
