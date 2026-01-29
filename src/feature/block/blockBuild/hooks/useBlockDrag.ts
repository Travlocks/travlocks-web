import type { DragStartEvent, DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useCallback, useRef, useState } from 'react';
import type { Block, SidebarBlock } from '../types/block';
import type { ActiveDrag, DockHintState, DragType } from '../types/drag';
import { getTailIdFromBlocks } from '../utils/path';
import { commitEditorDrop, commitSidebarDrop, detachTail } from '../utils/commit';
import { calcCandidate } from '../utils/boardCandidate';
import { buildDockHint, computeSnapDecision } from '../utils/dockHint';

// TODO: 여기서 퍼즐 시간 단위로 교체
const DEFAULT_BLOCK = { w: 260, h: 64 };
const GRID = 40;

const START_ID = 0;

const SNAP_THRESHOLD = 67;
const CONNECTOR_OFFSET = 0;
const ALLOW_BOTTOM = true;

interface UseBlockDragParams {
  puzzleBlocks: Block[];
  currentDay: number;
  updateBlocksByDay: (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => void; // 날짜별 블록 업데이트
  removeById: (blockId: number) => void;
}

export const useBlockDrag = ({ puzzleBlocks, currentDay, updateBlocksByDay, removeById }: UseBlockDragParams) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  // 보드 참조
  const boardRef = useRef<HTMLDivElement | null>(null);

  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [dockHint, setDockHint] = useState<DockHintState>(null);

  // 드래그 시작 후 블록 정보 설정
  const onDragStart = useCallback(
    (e: DragStartEvent) => {
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
          updateBlocksByDay((prev) => {
            const currentBlocks = prev[currentDay] ?? [];
            return {
              ...prev,
              [currentDay]: detachTail({ blocks: currentBlocks, startId: START_ID, movingId: blockId }),
            };
          });
        }
      }
    },
    [currentDay, updateBlocksByDay],
  );

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

      const overId = e.over?.id;

      const type = e.active.data.current?.type as DragType | undefined;

      // 휴지통 위에 드롭된 경우 -> 편집 중인 블록만 삭제
      if (overId === 'blockTrash' && type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number | undefined;
        if (blockId != null) {
          removeById(blockId);
        }
        return;
      }

      if (overId !== 'block-board') return;

      const boardEl = boardRef.current;
      if (!boardEl) return;

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

        // 날짜별 블록 업데이트
        updateBlocksByDay((prev) => {
          const currentBlocks = prev[currentDay] ?? [];
          return {
            ...prev,
            [currentDay]: commitSidebarDrop({
              blocks: currentBlocks,
              tpl: item,
              candidate,
              decision,
              startId: START_ID,
            }),
          };
        });
        return;
      }

      // 2) Editor 블록 이동 커밋
      if (type === 'blockEditor') {
        const blockId = e.active.data.current?.blockId as number | undefined;
        if (!blockId) return;

        updateBlocksByDay((prev) => {
          const currentBlocks = prev[currentDay] ?? [];
          return {
            ...prev,
            [currentDay]: commitEditorDrop({
              blocks: currentBlocks,
              movingId: blockId,
              candidate,
              decision,
              startId: START_ID,
            }),
          };
        });
      }
    },
    [currentDay, puzzleBlocks, updateBlocksByDay, removeById],
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
    dockHint,
    handlers: { onDragStart, onDragMove, onDragEnd, onDragCancel },
  };
};
