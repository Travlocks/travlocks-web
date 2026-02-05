/* eslint-disable react-hooks/set-state-in-effect */
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

    setBubbleSpecs(
      buildBubbleSpecs({
        seed,
        viewportWidth: w,
        viewportHeight: h,
        centerBlockWidthPx: 350,
        // big/small sizes는 배열로 고정된 값
        bigSizes: [387, 300, 250],
        smallSizes: [200, 180, 100],
      }),
    );

    setPuzzleSpecs(
      buildPuzzleSpecs({
        seed,
        viewportWidth: w,
        viewportHeight: h,
        sizes: [50, 50, 50, 50, 50],
      }),
    );
  }, []);

  return (
    <div className="pointer-events-none sticky min-h-[calc(100dvh-109px)] inset-0 z-hide overflow-hidden">
      {bubbleSpecs.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}
      {puzzleSpecs.map((p) => (
        <Puzzle key={p.id} {...p} />
      ))}
      <div className="absolute top-1/2 left-1/2 z-content -translate-x-1/2 -translate-y-1/2">
        <HeroTitle />
      </div>
    </div>
  );
}
