import { useEffect, useState } from 'react';
import { Bubble } from './Bubble';
import { buildBubbleSpecs, type BubbleSpec } from '../utils/bubbleLayout';
import { HeroTitle } from './HeroTitle';

export function HomeBackground() {
  const [specs, setSpecs] = useState<BubbleSpec[]>([]);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // 고정된 랜덤 시드
    const seed = 42;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setSpecs(
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
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {specs.map((b) => (
        <Bubble key={b.id} {...b} />
      ))}
      <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
        <HeroTitle />
      </div>
    </div>
  );
}
