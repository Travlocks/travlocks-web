import { useEffect, useRef } from 'react';
import { animate, useMotionValue } from 'motion/react';
import { getCalcOnPath } from './getCalcOnPath';

// 애니메이션 함수 타입
type Ease = 'linear' | 'easeInOut' | 'easeIn' | 'easeOut' | 'spring';

// 스플래시 비행기 이동 훅 인수 타입
type UsePathMotionArgs = {
  run: boolean;
  pathRef: React.RefObject<SVGPathElement>;
  targetRef: React.RefObject<SVGGElement>;
  planeW: number;
  planeH: number;
  duration?: number;
  ease?: Ease;
  aheadPx?: number;
  rotateOffsetDeg?: number;
  offsetY?: number;
  onComplete?: () => void;
};

// 스플래시 비행기 이동 훅
export function usePathMotion({
  run,
  pathRef,
  targetRef,
  planeW,
  planeH,
  duration = 2.2,
  ease = 'linear',
  aheadPx = 1,
  rotateOffsetDeg = 10,
  offsetY = 0,
  onComplete,
}: UsePathMotionArgs) {
  const doneRef = useRef(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!run) return;

    // 경로와 대상 요소 가져오기
    const path = pathRef.current;
    const target = targetRef.current;
    if (!path || !target) return;

    doneRef.current = false;

    // 애니메이션 적용 함수
    const apply = (t: number) => {
      const { x, y, angle } = getCalcOnPath(path, t, aheadPx);

      target.setAttribute(
        'transform',
        `translate(${x} ${y}) rotate(${angle + rotateOffsetDeg}) translate(${-planeW / 2} ${-planeH / offsetY})`,
      );
    };

    // 시작 위치 보정
    progress.set(0);
    apply(0);

    const unsub = progress.on('change', apply);

    const animation =
      ease === 'spring'
        ? animate(progress, 1, { type: 'spring', stiffness: 120, damping: 20 })
        : animate(progress, 1, { duration, ease });

    animation.then(() => {
      if (doneRef.current) return;
      doneRef.current = true;

      progress.set(0);
      onComplete?.();
    });

    return () => {
      unsub();
      animation.cancel();
    };
  }, [run, pathRef, targetRef, planeW, planeH, duration, ease, aheadPx, rotateOffsetDeg, onComplete, progress]);
}
