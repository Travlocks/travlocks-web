// src/pages/home/utils/bubbleLayout.ts
import { mulberry32, pick, randFloat, type PRNG } from './random';
import { sampleXUniform, toPct } from './layoutUtils';

export type BubbleVariant = 'a' | 'b';

// 회전 속도와 상승 거리는 고정
export const ROTATE_SEC = 10;
export const extraMin = 80;
export const extraMax = 60;

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

type UniformLayoutParams = {
  rng: PRNG;
  w: number;
  h: number;
  sizes: number[];
  centerBlockWidthPx: number;
  prefix: string;
  floatSecRange: [number, number];
  jitterRatio?: number;
};

// 균등 배치 함수: 좌우 영역을 균등하게 나눠서 버블 배치
function createUniformBubbles(params: UniformLayoutParams): BubbleSpec[] {
  const { rng, w, h, sizes, centerBlockWidthPx, prefix, floatSecRange, jitterRatio = 0.15 } = params;

  const count = sizes.length;
  const leftCount = Math.ceil(count / 2);
  const rightCount = count - leftCount;
  let leftIdx = 0;
  let rightIdx = 0;

  return sizes.map((size, idx) => {
    // 좌우 번갈아가며 배치
    const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
    const sideIndex = side === 'left' ? leftIdx++ : rightIdx++;
    const totalCount = side === 'left' ? leftCount : rightCount;

    const x = sampleXUniform({
      rng,
      w,
      size,
      centerBlockWidth: centerBlockWidthPx,
      side,
      index: sideIndex,
      totalCount,
      jitterRatio,
    });
    const extra = randFloat(rng, extraMin, extraMax);

    return {
      id: `${prefix}-${idx + 1}`,
      variant: pick(rng, ['b', 'a'] as const),
      size,
      left: toPct(x, w),
      floatSec: randFloat(rng, floatSecRange[0], floatSecRange[1]),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 0, 4),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });
}

// 버블 생성 함수
export function buildBubbleSpecs(opts: BubbleOptions): BubbleSpec[] {
  const {
    seed = Date.now(),
    viewportWidth: w,
    viewportHeight: h,
    centerBlockWidthPx = 350,
    bigSizes = [387, 300, 250],
    smallSizes = [200, 200, 138, 100],
  } = opts;

  const rng = mulberry32(seed);

  // 큰 버블 생성 - 균등 배치 함수 사용
  const big = createUniformBubbles({
    rng,
    w,
    h,
    sizes: bigSizes.slice(0, 3),
    centerBlockWidthPx,
    prefix: 'big',
    floatSecRange: [8, 10],
    jitterRatio: 0.15,
  });

  // 작은 버블 생성 - 균등 배치 함수 사용
  const small = createUniformBubbles({
    rng,
    w,
    h,
    sizes: smallSizes.slice(0, 4),
    centerBlockWidthPx,
    prefix: 'small',
    floatSecRange: [3, 8],
    jitterRatio: 0.15,
  });

  return [...big, ...small];
}
