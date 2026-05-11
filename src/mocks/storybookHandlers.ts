import type { RequestHandler } from 'msw';

/** Storybook 전용 MSW 핸들러. API 모킹이 필요한 스토리에서 `parameters.msw`로 추가하세요. */
export const storybookHandlers: RequestHandler[] = [];
