import { useCallback, useEffect, useRef, type RefObject } from 'react';
import type { Block } from '../types/block';
import { useBlockHistory } from './useBlockHistory';

type UpdateBlocksByDay = (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => void;

interface UseBlockUndoRedoParams {
  puzzleBlocks: Block[];
  currentDay: number;
  updateBlocksByDay: UpdateBlocksByDay;
  removeById: (blockId: number) => void;
  isSyncPausedRef: RefObject<boolean>;
}

/**
 * 블록 에디터 undo/redo 조합 훅
 * - 드래그 시점 스냅샷 저장, tracked update/remove로 히스토리 push
 * - undo/redo 시 sync 일시 억제
 */
export const useBlockUndoRedo = ({
  puzzleBlocks,
  currentDay,
  updateBlocksByDay,
  removeById,
  isSyncPausedRef,
}: UseBlockUndoRedoParams) => {
  const history = useBlockHistory();
  const puzzleBlocksRef = useRef<Block[]>(puzzleBlocks);
  const preActionRef = useRef<Block[] | null>(null);

  // 블록 상태 동기화
  useEffect(() => {
    puzzleBlocksRef.current = puzzleBlocks;
  }, [puzzleBlocks]);

  // 날짜 변경 시 히스토리 초기화
  useEffect(() => {
    history.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  // 드래그 상태 변경 시 히스토리 추가
  const onDragStateChange = useCallback(
    (isDragging: boolean) => {
      isSyncPausedRef.current = isDragging;
      if (isDragging) {
        preActionRef.current = structuredClone(puzzleBlocksRef.current);
      }
    },
    [isSyncPausedRef],
  );

  // 블록 업데이트 시 히스토리 추가
  const trackedUpdateBlocksByDay = useCallback(
    (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => {
      if (preActionRef.current) {
        history.push(preActionRef.current);
        preActionRef.current = null;
      }
      updateBlocksByDay(updater);
    },
    [updateBlocksByDay, history],
  );

  // 블록 삭제 시 히스토리 추가
  const trackedRemoveById = useCallback(
    (blockId: number) => {
      if (preActionRef.current) {
        history.push(preActionRef.current);
        preActionRef.current = null;
      }
      removeById(blockId);
    },
    [removeById, history],
  );

  const handleUndo = useCallback(() => {
    const prev = history.undo(puzzleBlocks);
    if (prev) {
      isSyncPausedRef.current = true;
      updateBlocksByDay((all) => ({ ...all, [currentDay]: prev }));
      queueMicrotask(() => {
        isSyncPausedRef.current = false;
      });
    }
  }, [history, puzzleBlocks, updateBlocksByDay, currentDay, isSyncPausedRef]);

  const handleRedo = useCallback(() => {
    const next = history.redo(puzzleBlocks);
    if (next) {
      isSyncPausedRef.current = true;
      updateBlocksByDay((all) => ({ ...all, [currentDay]: next }));
      queueMicrotask(() => {
        isSyncPausedRef.current = false;
      });
    }
  }, [history, puzzleBlocks, updateBlocksByDay, currentDay, isSyncPausedRef]);

  // Cmd+Z / Cmd+Y 단축키 등록
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo, handleRedo]);

  return {
    trackedUpdateBlocksByDay,
    trackedRemoveById,
    onDragStateChange,
    handleUndo,
    handleRedo,
    canUndo: history.canUndo,
    canRedo: history.canRedo,
  };
};
