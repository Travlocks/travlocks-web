import { useCallback, useRef, useState } from 'react';
import type { Block } from '../types/block';

const MAX_HISTORY = 50;

export const useBlockHistory = () => {
  const pastRef = useRef<Block[][]>([]);
  const futureRef = useRef<Block[][]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // canUndo / canRedo 상태 동기화
  const syncFlags = useCallback(() => {
    setCanUndo(pastRef.current.length > 0);
    setCanRedo(futureRef.current.length > 0);
  }, []);

  // 히스토리 추가
  const push = useCallback(
    (snapshot: Block[]) => {
      pastRef.current.push(snapshot);
      if (pastRef.current.length > MAX_HISTORY) pastRef.current.shift();
      futureRef.current = [];
      syncFlags();
    },
    [syncFlags],
  );

  // 이전 상태로 되돌리기
  const undo = useCallback(
    (currentBlocks: Block[]): Block[] | null => {
      if (pastRef.current.length === 0) return null;
      const prev = pastRef.current.pop()!;
      futureRef.current.push(structuredClone(currentBlocks));
      syncFlags();
      return prev;
    },
    [syncFlags],
  );

  // 다음 상태로 되돌리기
  const redo = useCallback(
    (currentBlocks: Block[]): Block[] | null => {
      if (futureRef.current.length === 0) return null;
      const next = futureRef.current.pop()!;
      pastRef.current.push(structuredClone(currentBlocks));
      syncFlags();
      return next;
    },
    [syncFlags],
  );

  // 히스토리 초기화
  const clear = useCallback(() => {
    pastRef.current = [];
    futureRef.current = [];
    syncFlags();
  }, [syncFlags]);

  return { push, undo, redo, clear, canUndo, canRedo };
};
