// src/pages/home/utils/bubbleLayout.ts
import { mulberry32, pick, randFloat } from './random';
import { sampleXAvoidCenter, toPct } from './layoutUtils';

export type BubbleVariant = 'a' | 'b';

// 회전 속도와 상승 거리는 고정
export const ROTATE_SEC = 10;
export const extraMin = 80;
export const extraMax = 180;

export type BubbleSpec = {
  id: string;
  variant: BubbleVariant;
  size: number;
  left: string;
  startY: number;
  endY: number;
  floatSec: number;
  rotateSec: number;
  delaySec: number;
  opacity: number;
};

type BubbleOptions = {
  seed?: number | string;
  viewportWidth: number;
  viewportHeight: number;

  // 중앙 텍스트 영역(가로 띠) 폭
  centerBlockWidthPx?: number;
  bigSizes?: number[];
  smallSizes?: number[];
};

// 버블 생성 함수
export function buildBubbleSpecs(opts: BubbleOptions): BubbleSpec[] {
  const {
    seed = Date.now(),
    viewportWidth: w,
    viewportHeight: h,
    centerBlockWidthPx = 400,
    bigSizes = [387, 300],
    smallSizes = [200, 180, 138, 100],
  } = opts;

  const rng = mulberry32(seed);

  // 큰 버블 생성
  const big: BubbleSpec[] = bigSizes.slice(0, 2).map((size, idx) => {
    const side: 'left' | 'right' = idx === 0 ? 'left' : 'right';
    const x = sampleXAvoidCenter({ rng, w, size, centerBlockWidth: centerBlockWidthPx, side });
    const extra = randFloat(rng, extraMin, extraMax);

    return {
      id: `big-${idx + 1}`,
      variant: pick(rng, ['b', 'a'] as const),
      size,
      left: toPct(x, w),
      floatSec: randFloat(rng, 8, 12),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 0, 1.2),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });

  // 작은 버블 생성
  const small: BubbleSpec[] = smallSizes.map((size, idx) => {
    const side: 'left' | 'right' = pick(rng, ['left', 'right'] as const);
    const x = sampleXAvoidCenter({ rng, w, size, centerBlockWidth: centerBlockWidthPx, side });
    const extra = randFloat(rng, extraMin, extraMax);

    return {
      id: `small-${idx + 1}`,
      variant: pick(rng, ['b', 'a'] as const),
      size,
      left: toPct(x, w),
      floatSec: randFloat(rng, 4, 10),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 0, 2.5),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });

  return [...big, ...small];
}
