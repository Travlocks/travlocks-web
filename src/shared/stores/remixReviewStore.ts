import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 리믹스 상태를 서버 DTO로 알 수 없어서 클라이언트에서 리믹스시에 임시 보관함
type RemixReviewState = {
  // key: remixedTemplateId, value: parentTemplateId
  pendingReviewByTemplateId: Record<number, number>;
};

type RemixReviewActions = {
  registerRemix: (remixedTemplateId: number, parentTemplateId: number) => void;
  consumePendingReview: (remixedTemplateId: number) => void;
  clearAll: () => void;
};

export const useRemixReviewStore = create<RemixReviewState & RemixReviewActions>()(
  persist(
    (set) => ({
      pendingReviewByTemplateId: {},

      registerRemix: (remixedTemplateId, parentTemplateId) => {
        if (!Number.isInteger(remixedTemplateId) || remixedTemplateId <= 0) return;
        if (!Number.isInteger(parentTemplateId) || parentTemplateId <= 0) return;

        set((state) => ({
          pendingReviewByTemplateId: {
            ...state.pendingReviewByTemplateId,
            [remixedTemplateId]: parentTemplateId,
          },
        }));
      },

      consumePendingReview: (remixedTemplateId) => {
        set((state) => {
          if (!(remixedTemplateId in state.pendingReviewByTemplateId)) {
            return state;
          }

          const next = { ...state.pendingReviewByTemplateId };
          delete next[remixedTemplateId];

          return {
            pendingReviewByTemplateId: next,
          };
        });
      },

      clearAll: () => {
        set({ pendingReviewByTemplateId: {} });
      },
    }),
    {
      name: 'remix-review-store',
      version: 1,
    },
  ),
);
