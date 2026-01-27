// 값 제한
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
// 그리드 점 계산
export const snap = (n: number, step: number) => Math.round(n / step) * step;
// 그리드 점 계산 (x, y)
export const snapPoint = (p: { x: number; y: number }, grid: number) => ({
  x: snap(p.x, grid),
  y: snap(p.y, grid),
});
