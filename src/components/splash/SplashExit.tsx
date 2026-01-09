import { useRef } from 'react';
import Plane from '@/shared/assets/splash/plane.svg?react';
import { usePathMotion } from './utils/usePathMotion';
import {
  SPLASH_EXIT_ANIMATION,
  SPLASH_VIEWBOX_D,
  PLANE_H,
  PLANE_W,
  SPLASH_PRESERVE_ASPECT_RATIO,
  SPLASH_VIEWBOX,
} from './utils/constants';
import splashPlaneLineUrl from '@assets/splash/splash-line.svg?url';

interface SplashExitProps {
  onDone: () => void;
}

// 스플래시 종료 컴포넌트
const SplashExit = ({ onDone }: SplashExitProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const planeGroupRef = useRef<SVGGElement | null>(null);
  const run = true;

  // 스플래시 비행기 이동 애니메이션
  usePathMotion({
    run,
    pathRef: pathRef as React.RefObject<SVGPathElement>,
    targetRef: planeGroupRef as React.RefObject<SVGGElement>,
    planeW: PLANE_W,
    planeH: PLANE_H,
    duration: SPLASH_EXIT_ANIMATION.duration,
    ease: SPLASH_EXIT_ANIMATION.ease,
    onComplete: onDone,
    rotateOffsetDeg: 10, // 비행기 방향이 이상하면 여기서 +90/-90 같은 오프셋 조정
    offsetY: 16,
  });

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <img
        src={splashPlaneLineUrl}
        alt="splash-plane-line"
        className="absolute translate-y-[6%] inset-0 w-full h-full"
      />

      {/* 스플래시 비행기 경로 */}
      <svg
        viewBox={SPLASH_VIEWBOX}
        preserveAspectRatio={SPLASH_PRESERVE_ASPECT_RATIO}
        className="absolute inset-0 w-full h-full">
        {/* 계산용 경로(보이지 않음) */}
        <path ref={pathRef} d={SPLASH_VIEWBOX_D} fill="none" stroke="none" />

        {/* 비행기 */}
        <g ref={planeGroupRef}>
          <Plane width={PLANE_W} height={PLANE_H} />
        </g>
      </svg>
    </div>
  );
};

export default SplashExit;
