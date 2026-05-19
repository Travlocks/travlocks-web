/** 로컬 UI 확인용 (import.meta.env.DEV 에서만 동작) */

export const isDevSignupPreview = import.meta.env.DEV;

export const isMockEmailApi = () =>
  isDevSignupPreview && new URLSearchParams(window.location.search).get('mockEmail') === '1';

export const readDevSignupStep = (maxExclusive: number): number => {
  if (!isDevSignupPreview) return 0;

  const raw = new URLSearchParams(window.location.search).get('step');
  if (raw == null) return 0;

  const step = Number(raw);
  if (!Number.isInteger(step) || step < 0) return 0;

  return Math.min(step, maxExclusive - 1);
};
