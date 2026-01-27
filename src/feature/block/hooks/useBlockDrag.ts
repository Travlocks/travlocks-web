import type { DragStartEvent, DragMoveEvent, DragEndEvent } from '@dnd-kit/core';
import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useCallback, useRef, useState } from 'react';
import type { Block, SidebarBlock } from '../types/block';
import type { ActiveDrag, DragType, SnapPreviewsState } from '../types/drag';
import { calcBoardPointFromActiveRect, clampInBoard, getActiveRect } from '../utils/board';

const DEFAULT_BLOCK = { w: 260, h: 64 };
const GRID = 40;

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
  const [snapPreview, setSnapPreview] = useState<SnapPreviewsState>(null);

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
    }
  }, []);

  // 드래그 중일 때 스냅 프리뷰 표시
  const onDragMove = useCallback((e: DragMoveEvent) => {
    const boardEl = boardRef.current;
    if (!boardEl) return;

    const type = e.active.data.current?.type as DragType | undefined;
    const isOverBoard = e.over?.id === 'block-board';

    // 보드 위에 있을 때만 스냅 프리뷰 표시
    if (!isOverBoard) {
      setSnapPreview(null);
      return;
    }

    // Sidebar에서 드래그 중일 때 스냅 프리뷰
    if (type === 'blockSidebar') {
      const activeRect = getActiveRect(e.active.rect);
      if (!activeRect) return;

      const w = DEFAULT_BLOCK.w;
      const h = DEFAULT_BLOCK.h;
      const { x, y } = calcBoardPointFromActiveRect({ boardEl, activeRect, w, h, grid: GRID });

      setSnapPreview({ x, y, w, h, visible: true });
    }

    // Editor 블록 이동 중일 때 스냅 프리뷰
    if (type === 'blockEditor') {
      const startX = e.active.data.current?.startX as number | undefined;
      const startY = e.active.data.current?.startY as number | undefined;
      const w = e.active.data.current?.w as number | undefined;
      const h = e.active.data.current?.h as number | undefined;

      if (startX == null || startY == null || !w || !h) return;

      const { x, y } = clampInBoard({
        boardEl,
        x: startX + e.delta.x,
        y: startY + e.delta.y,
        w,
        h,
        grid: GRID,
      });

      setSnapPreview({ x, y, w, h, visible: true });
    }
  }, []);

  // 드래그 종료 시 블록 정보 설정
  const onDragEnd = useCallback((e: DragEndEvent) => {
    setActiveDrag(null);
    setSnapPreview(null);

    if (e.over?.id !== 'block-board') return;

    const boardEl = boardRef.current;
    if (!boardEl) return;

    const type = e.active.data.current?.type as DragType | undefined;

    // 1) Sidebar -> Board 생성
    if (type === 'blockSidebar') {
      const item = e.active.data.current?.item as SidebarBlock | undefined;
      if (!item) return;

      const w = DEFAULT_BLOCK.w;
      const h = DEFAULT_BLOCK.h;

      const activeRect = getActiveRect(e.active.rect);
      if (!activeRect) return;

      const { x, y } = calcBoardPointFromActiveRect({ boardEl, activeRect, w, h, grid: GRID });

      const newBlock: Block = {
        blockId: item.id,
        name: item.name,
        category: item.category,
        duration: item.duration,
        imageUrl: item.imageUrl,
        x,
        y,
        w,
        h,
        connectors: { input: null, output: null },
      };

      setPuzzleBlocks((prev) => {
        // 이미 존재하는 블록이면 추가하지 않음
        const exist = prev.some((block) => block.blockId === newBlock.blockId);
        if (exist) return prev;
        return [...prev, newBlock];
      });
      return;
    }

    // 2) Editor 블록 이동 커밋
    if (type === 'blockEditor') {
      const blockId = e.active.data.current?.blockId as number | undefined;
      const startX = e.active.data.current?.startX as number | undefined;
      const startY = e.active.data.current?.startY as number | undefined;
      const w = e.active.data.current?.w as number | undefined;
      const h = e.active.data.current?.h as number | undefined;

      if (!blockId || startX == null || startY == null || !w || !h) return;

      const { x, y } = clampInBoard({
        boardEl,
        x: startX + e.delta.x,
        y: startY + e.delta.y,
        w,
        h,
        grid: GRID,
      });

      setPuzzleBlocks((prev) => prev.map((block) => (block.blockId === blockId ? { ...block, x, y } : block)));
    }
  }, []);

  // 드래그 취소 시 블록 정보 초기화
  const onDragCancel = useCallback(() => {
    setActiveDrag(null);
    setSnapPreview(null);
  }, []);

  return {
    sensors,
    boardRef,
    activeDrag,
    puzzleBlocks,
    snapPreview,
    actions: {
      setPuzzleBlocks,
      reset: () => setPuzzleBlocks([]),
      removeById: (blockId: number) => setPuzzleBlocks((prev) => prev.filter((block) => block.blockId !== blockId)),
      updateBlock: (blockId: number, updates: Partial<Block>) =>
        setPuzzleBlocks((prev) => prev.map((block) => (block.blockId === blockId ? { ...block, ...updates } : block))),
    },
    handlers: { onDragStart, onDragMove, onDragEnd, onDragCancel },
  };
};
