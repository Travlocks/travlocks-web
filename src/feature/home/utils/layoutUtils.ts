import { randFloat, type PRNG } from './random';

// 퍼센트 변환 함수
export function toPct(px: number, total: number) {
  return `${(px / total) * 100}%`;
}

// 중앙 영역을 피하면서 랜덤 배치 함수
export function sampleXAvoidCenter(params: {
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

  // "원 전체"가 중앙 영역을 침범하지 않도록 반지름까지 고려
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
