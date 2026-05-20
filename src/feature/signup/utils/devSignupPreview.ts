import type { QueryClient } from '@tanstack/react-query';

import { SIGNUP_KEY } from '../constants/key';
import type { ResponseSignupDto } from '../types/auth';

/** 로컬 UI 확인용 (import.meta.env.DEV 에서만 동작) */

export const isDevSignupPreview = import.meta.env.DEV;

export const isMockEmailApi = () =>
  isDevSignupPreview && new URLSearchParams(window.location.search).get('mockEmail') === '1';

export const isDevCompletePreview = () =>
  isDevSignupPreview && new URLSearchParams(window.location.search).get('step') === 'complete';

export const DEV_SIGNUP_COMPLETE_MOCK: ResponseSignupDto = {
  isSuccess: true,
  successCode: 'DEV_PREVIEW',
  successMessage: '개발용 완료 화면 미리보기',
  data: {
    memberId: 1,
    nickname: '트래블러',
    accessToken: 'dev-preview-token',
    accessTokenExpiresIn: 3600,
    profileImageUrl: '',
    preferredTravelThemes: [
      { themeId: 1, content: '자연' },
      { themeId: 3, content: '맛집' },
    ],
    preferredTravelStyles: [{ styleId: 1, content: '자유 계획형' }],
  },
};

export const seedDevSignupCompleteMock = (queryClient: QueryClient) => {
  queryClient.setQueryData(SIGNUP_KEY.signup, DEV_SIGNUP_COMPLETE_MOCK);
};

export const readDevSignupStep = (totalSteps: number): number => {
  if (!isDevSignupPreview) return 0;

  const raw = new URLSearchParams(window.location.search).get('step');
  if (raw == null) return 0;

  if (raw === 'complete') return totalSteps;

  const step = Number(raw);
  if (!Number.isInteger(step) || step < 0) return 0;

  return Math.min(step, totalSteps - 1);
};
