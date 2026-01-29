import { useMemo } from 'react';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useShallow } from 'zustand/react/shallow';
import type { Block } from '../types/block';

export const useBlockEditor = () => {
  const { currentDay, blocksByDay, setDay, reset, setPuzzleBlocks, removeById, updateBlock, updateBlocksByDay } =
    useBlockTemplateStore(
      useShallow((s) => ({
        currentDay: s.currentDay,
        blocksByDay: s.blocksByDay,
        setDay: s.setDay,
        reset: s.reset,
        setPuzzleBlocks: s.setPuzzleBlocks,
        removeById: s.removeById,
        updateBlock: s.updateBlock,
        updateBlocksByDay: s.updateBlocksByDay,
      })),
    );

  const puzzleBlocks = useMemo(() => blocksByDay[currentDay] ?? ([] as Block[]), [blocksByDay, currentDay]);

  return {
    puzzleBlocks,
    currentDay,
    blocksByDay,
    actions: {
      setDay,
      reset,
      setPuzzleBlocks,
      removeById,
      updateBlock,
      updateBlocksByDay,
    },
  };
};
