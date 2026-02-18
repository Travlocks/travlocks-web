import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Block } from '@/feature/block/blockBuild/types/block';
import { removeBlock } from '@/feature/block/blockBuild/utils/commit';
import { createRectPoints } from '@/shared/components/Block/blockShape';

const START_ID = 0;

const START_BLOCK: Block = {
  blockId: START_ID,
  name: 'START',
  category: '기타',
  duration: '',
  x: 44,
  y: 76,
  w: 186,
  h: 87,
  points: createRectPoints(186, 87),
  connectors: [{ type: 'socket', edgeIndex: 1, align: 'center' }],
  connectedTo: null,
  connectedFrom: null,
};

type BlockTemplateState = {
  templateId: string | null;
  templateTitle: string;
  templateDescription: string;
  templateCoverImageUrl: string;
  templateCityIds: number[];
  currentDay: number;
  blocksByDay: Record<number, Block[]>;
};

type BlockTemplateActions = {
  setTemplateId: (templateId: string | null) => void;
  setTemplateTitle: (title: string) => void;
  setTemplateInfo: (info: { title: string; description: string; coverImageUrl: string }) => void;
  setTemplateCityIds: (cityIds: number[]) => void;
  setDay: (day: number) => void;
  reset: (day?: number) => void;
  setPuzzleBlocks: (blocks: Block[]) => void;
  updateBlock: (blockId: number, updates: Partial<Block>) => void;
  removeById: (blockId: number) => void;
  updateBlocksByDay: (updater: (prev: Record<number, Block[]>) => Record<number, Block[]>) => void;
};

// TODO: 필드명 Days 범위 추가 시 동적 수정 필요
function createDefaultBlocksByDayRecord(): Record<number, Block[]> {
  return {
    1: [START_BLOCK],
    2: [START_BLOCK],
    3: [START_BLOCK],
    4: [START_BLOCK],
    5: [START_BLOCK],
  };
}

export const useBlockTemplateStore = create<BlockTemplateState & BlockTemplateActions>()(
  persist(
    (set, get) => ({
      templateId: null,
      templateTitle: '',
      templateDescription: '',
      templateCoverImageUrl: '',
      templateCityIds: [],
      currentDay: 1,
      blocksByDay: createDefaultBlocksByDayRecord(),

      setTemplateId: (templateId) => {
        const prevId = get().templateId;
        if (prevId === templateId) return;

        // 템플릿이 바뀌면 편집 상태를 템플릿 기준으로 초기화 (서버 연동 전 임시 정책)
        set({
          templateId,
          templateTitle: '',
          templateDescription: '',
          templateCoverImageUrl: '',
          templateCityIds: [],
          currentDay: 1,
          blocksByDay: createDefaultBlocksByDayRecord(),
        });
      },

      setTemplateTitle: (title) => {
        set({ templateTitle: title });
      },

      setTemplateInfo: (info) => {
        set({
          templateTitle: info.title,
          templateDescription: info.description,
          templateCoverImageUrl: info.coverImageUrl,
        });
      },

      setTemplateCityIds: (cityIds) => {
        set({ templateCityIds: cityIds });
      },

      // 날짜 설정
      setDay: (day) => {
        if (day < 1 || day > 5) return;
        set({ currentDay: day });
      },

      // 블록 초기화
      reset: (day) => {
        const targetDay = day ?? get().currentDay;
        set((state) => ({
          blocksByDay: {
            ...state.blocksByDay,
            [targetDay]: [START_BLOCK],
          },
        }));
      },

      // 블록 설정
      setPuzzleBlocks: (blocks) => {
        const { currentDay } = get();
        set((state) => ({
          blocksByDay: {
            ...state.blocksByDay,
            [currentDay]: blocks,
          },
        }));
      },

      // 블록 업데이트
      updateBlock: (blockId, updates) => {
        const { currentDay } = get();
        set((state) => {
          const blocks = state.blocksByDay[currentDay] ?? [START_BLOCK];
          return {
            blocksByDay: {
              ...state.blocksByDay,
              [currentDay]: blocks.map((b: Block) => (b.blockId === blockId ? { ...b, ...updates } : b)),
            },
          };
        });
      },

      // 블록 삭제
      removeById: (blockId) => {
        const { currentDay } = get();
        set((state) => {
          const blocks = state.blocksByDay[currentDay] ?? [START_BLOCK];
          return {
            blocksByDay: {
              ...state.blocksByDay,
              [currentDay]: removeBlock({ blocks, blockId, startId: START_ID }),
            },
          };
        });
      },

      // 블록 업데이트 (날짜별)
      updateBlocksByDay: (updater) => {
        set((state) => ({ blocksByDay: updater(state.blocksByDay) }));
      },
    }),
    {
      name: `block-template-store`,
      version: 5, // templateDescription, templateCoverImageUrl 추가
      migrate: () => {
        // 이전 버전 데이터는 새 구조와 호환되지 않으므로 초기화
        return {
          templateId: null,
          templateTitle: '',
          templateDescription: '',
          templateCoverImageUrl: '',
          templateCityIds: [],
          currentDay: 1,
          blocksByDay: createDefaultBlocksByDayRecord(),
        };
      },
    },
  ),
);
