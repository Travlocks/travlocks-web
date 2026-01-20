// src/pages/home/utils/bubbleLayout.ts
import { mulberry32, pick, randFloat, type PRNG } from './random';

export type BubbleVariant = 'a' | 'b';

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

type Options = {
  seed?: number | string;
  viewportWidth: number;
  viewportHeight: number;

  // 중앙 텍스트 영역(가로 띠) 폭
  centerBlockWidthPx?: number;
  bigSizes?: number[];
  smallSizes?: number[];
};

// 퍼센트 변환 함수
function toPct(px: number, total: number) {
  return `${(px / total) * 100}%`;
}

// 중앙 영역을 피하면서 랜덤 배치 함수
function sampleXAvoidCenter(params: {
  rng: PRNG;
  w: number;
  size: number;
  centerBlockWidth: number;
  side: 'left' | 'right';
}) {
  const { rng, w, size, centerBlockWidth, side } = params;
  const half = size / 2;

  const centerLeft = w / 2 - centerBlockWidth / 2;
  const centerRight = w / 2 + centerBlockWidth / 2;

  const minX = half;
  const maxX = w;

  // “원 전체”가 중앙 영역을 침범하지 않도록 반지름까지 고려
  const leftMax = centerLeft - half;
  const rightMin = centerRight + half;

  // 화면이 너무 좁아 범위가 깨질 때 fallback
  if (leftMax < minX || rightMin > maxX) {
    return side === 'left' ? w * 0.12 : w * 0.88;
  }

  if (side === 'left') {
    const x = randFloat(rng, minX, leftMax);
    return x;
  }
  const x = randFloat(rng, rightMin, maxX);
  return x;
}

// 버블 생성 함수
export function buildBubbleSpecs(opts: Options): BubbleSpec[] {
  const {
    seed = Date.now(),
    viewportWidth: w,
    viewportHeight: h,
    centerBlockWidthPx = 400,
    bigSizes = [387, 300],
    smallSizes = [200, 180, 138, 100],
  } = opts;

  const rng = mulberry32(seed);

  // 회전 속도와 상승 거리는 고정
  const ROTATE_SEC = 10;
  const extraMin = 80;
  const extraMax = 180;

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
      floatSec: randFloat(rng, 6, 10),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 0, 2.5),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });

  return [...big, ...small];
}
