import { mulberry32, randFloat } from './random';
import { sampleXUniform, toPct } from './layoutUtils';
import { ROTATE_SEC, extraMax, extraMin } from './bubbleLayout';

export type PuzzleSpec = {
  id: string;
  size: number;
  left: string;
  startY: number;
  endY: number;
  floatSec: number;
  rotateSec: number;
  delaySec: number;
  opacity: number;
};

type PuzzleOptions = {
  seed?: number | string;
  viewportWidth: number;
  viewportHeight: number;
  centerBlockWidthPx?: number;
  sizes?: number[];
};

export function buildPuzzleSpecs(opts: PuzzleOptions): PuzzleSpec[] {
  const { seed = Date.now(), viewportWidth: w, viewportHeight: h, sizes = [50, 50, 50, 50, 50] } = opts;
  const rng = mulberry32(seed);

  // 퍼즐을 좌우 균등 배치
  const puzzleCount = sizes.length;
  const puzzleLeftCount = Math.ceil(puzzleCount / 2);
  const puzzleRightCount = puzzleCount - puzzleLeftCount;
  let puzzleLeftIdx = 0;
  let puzzleRightIdx = 0;

  const puzzles: PuzzleSpec[] = sizes.map((size, idx) => {
    // 좌우 번갈아가며 배치
    const side: 'left' | 'right' = idx % 2 === 0 ? 'left' : 'right';
    const sideIndex = side === 'left' ? puzzleLeftIdx++ : puzzleRightIdx++;
    const totalCount = side === 'left' ? puzzleLeftCount : puzzleRightCount;

    const x = sampleXUniform({
      rng,
      w,
      size,
      side,
      index: sideIndex,
      totalCount,
      jitterRatio: 0.2,
    });
    const extra = randFloat(rng, extraMin, extraMax);

    return {
      id: `puzzle-${idx + 1}`,
      size,
      left: toPct(x, w),
      floatSec: randFloat(rng, 4, 5),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 2, 8.5),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });
  return [...puzzles];
}
