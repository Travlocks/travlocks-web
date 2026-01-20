import { mulberry32, pick, randFloat } from './random';
import { sampleXAvoidCenter, toPct } from './layoutUtils';
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
  const {
    seed = Date.now(),
    viewportWidth: w,
    viewportHeight: h,
    centerBlockWidthPx = 300,
    sizes = [50, 50, 50, 50, 50],
  } = opts;

  const rng = mulberry32(seed);

  const puzzles: PuzzleSpec[] = sizes.map((size, idx) => {
    const side: 'left' | 'right' = pick(rng, ['left', 'right'] as const);
    const x = sampleXAvoidCenter({ rng, w, size, centerBlockWidth: centerBlockWidthPx, side });
    const extra = randFloat(rng, extraMin, extraMax);

    return {
      id: `puzzle-${idx + 1}`,
      size,
      left: toPct(x, w),
      floatSec: randFloat(rng, 6, 8),
      rotateSec: ROTATE_SEC,
      delaySec: randFloat(rng, 0, 1.2),
      startY: h + size + extra,
      endY: -size - extra,
      opacity: 1,
    };
  });
  return [...puzzles];
}
