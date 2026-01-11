// 경로에 따른 계산 함수(t: 현재 시간, aheadPx: 앞으로 이동할 거리)
export function getCalcOnPath(path: SVGPathElement, t: number, aheadPx = 1) {
  // 경로 전체 길이
  const total = path.getTotalLength();
  // 현재 시간에 따른 경로 길이
  const clamped = Math.min(1, Math.max(0, t));
  // 현재 시간에 따른 경로 길이
  const len = total * clamped;
  // 현재 시간에 따른 경로 좌표
  const p1 = path.getPointAtLength(len);
  // 현재 시간에 따른 경로 좌표
  const p2 = path.getPointAtLength(Math.min(total, len + aheadPx));
  // 현재 시간에 따른 경로 각도
  const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  // 현재 시간에 따른 경로 계산 결과
  return { x: p1.x, y: p1.y, angle };
}
