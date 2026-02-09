export type RectLike = { left: number; top: number; width: number; height: number };

export function calcBoardPointFromActiveRect(params: {
  boardEl: HTMLDivElement;
  activeRect: RectLike;
  w: number;
  h: number;
  zoom: number;
  pad: number;
  grid?: number;
}) {
  const { boardEl, activeRect, zoom, pad, grid = 0 } = params;
  const boardRect = boardEl.getBoundingClientRect();

  // 드래그 중인 요소의 중심 (화면 좌표)
  const centerX = activeRect.left + activeRect.width / 2;
  const centerY = activeRect.top + activeRect.height / 2;

  // 보드 뷰포트 기준 좌표 (스크롤 포함)
  const viewX = centerX - boardRect.left + boardEl.scrollLeft;
  const viewY = centerY - boardRect.top + boardEl.scrollTop;

  // DOM 요소의 실제 크기를 줌으로 역산해서 논리적 크기로 변환
  // 중심점 계산에 activeRect 크기를 사용했으므로, 오프셋도 같은 크기 사용 필요
  const actualW = activeRect.width / zoom;
  const actualH = activeRect.height / zoom;

  // 줌 역산하여 캔버스 데이터 좌표로 변환, 패딩 제거, 블록 중심 맞춤
  let x = viewX / zoom - pad - actualW / 2;
  let y = viewY / zoom - pad - actualH / 2;

  if (grid > 0) {
    x = Math.round(x / grid) * grid;
    y = Math.round(y / grid) * grid;
  }

  return { x, y };
}
