export type RectLike = { left: number; top: number; width: number; height: number };

// 활성 블록 중심 포인트 계산 (뷰포트 기준 -> 캔버스 데이터 좌표로 변환)
export function calcBoardPointFromActiveRect(params: {
  boardEl: HTMLDivElement;
  activeRect: RectLike;
  w: number;
  h: number;
  zoom: number;
  pad: number;
  grid?: number;
}) {
  const { boardEl, activeRect, w, h, zoom, pad, grid = 0 } = params;
  const boardRect = boardEl.getBoundingClientRect();

  // 드래그 중인 요소의 중심 (화면 좌표)
  const centerX = activeRect.left + activeRect.width / 2;
  const centerY = activeRect.top + activeRect.height / 2;

  // 보드 뷰포트 기준 좌표 (스크롤 포함)
  const viewX = centerX - boardRect.left + boardEl.scrollLeft;
  const viewY = centerY - boardRect.top + boardEl.scrollTop;

  // 줌 역산하여 캔버스 데이터 좌표로 변환, 패딩 제거, 블록 중심 맞춤
  let x = viewX / zoom - pad - w / 2;
  let y = viewY / zoom - pad - h / 2;

  if (grid > 0) {
    x = Math.round(x / grid) * grid;
    y = Math.round(y / grid) * grid;
  }

  return { x, y };
}
