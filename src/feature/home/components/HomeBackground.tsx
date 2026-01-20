import { useEffect, useState } from 'react';
import { Bubble } from './Bubble';
import { buildBubbleSpecs, type BubbleSpec } from '../utils/bubbleLayout';
import { Puzzle } from './Puzzle';
import { buildPuzzleSpecs, type PuzzleSpec } from '../utils/puzzleLayout';
import { HeroTitle } from './HeroTitle';

export function HomeBackground() {
  const [bubbleSpecs, setBubbleSpecs] = useState<BubbleSpec[]>([]);
  const [puzzleSpecs, setPuzzleSpecs] = useState<PuzzleSpec[]>([]);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // 고정된 랜덤 시드
    const seed = 42;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setBubbleSpecs(
      buildBubbleSpecs({
        seed,
        viewportWidth: w,
        viewportHeight: h,
        centerBlockWidthPx: 500,
        // big/small sizes는 배열로 고정된 값
        bigSizes: [387, 300],
        smallSizes: [200, 180, 138, 100],
      }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setPuzzleSpecs(
      buildPuzzleSpecs({
        seed,
        viewportWidth: w,
        viewportHeight: h,
        centerBlockWidthPx: 500,
        sizes: [50, 50, 50, 50, 50],
      }),
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {bubbleSpecs.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}
      {puzzleSpecs.map((p) => (
        <Puzzle key={p.id} {...p} />
      ))}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <HeroTitle />
      </div>
    </div>
  );
}
