import { clamp } from '@/feature/home/utils/random';
import { useCallback, useEffect, useRef, useState } from 'react';

type Options = {
  minZoom?: number;
  maxZoom?: number;
  zoomSpeed?: number;
  allowMetaKey?: boolean; // macos 핀치
  enableSpacePan?: boolean;
  enableBackgroundPan?: boolean;
  panIgnoreSelector?: string; // 패닝 무시할 요소 선택자 ('data-pan-ignore')
};

export function useCanvasPanZoom(options: Options = {}) {
  const {
    minZoom = 0.5,
    maxZoom = 2,
    zoomSpeed = 0.003,
    allowMetaKey = true,
    enableSpacePan = true,
    enableBackgroundPan = true,
    panIgnoreSelector = '',
  } = options;

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  // 줌 값 참조
  useEffect(() => void (zoomRef.current = zoom), [zoom]);

  const [spaceDown, setSpaceDown] = useState(false);
  // 스페이스 패닝 이벤트 리스너
  useEffect(() => {
    if (!enableSpacePan) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpaceDown(true);
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') setSpaceDown(false);
    };
    window.addEventListener('keydown', onKeyDown, { passive: false }); // passive: 기본 동작 방지
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [enableSpacePan]);

  const [isPanning, setIsPanning] = useState(false);
  const panRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    pointerId: -1,
  });

  // 포인터 위치에서 줌 값 계산
  const zoomAtPointer = useCallback(
    (clientX: number, clientY: number, deltaY: number) => {
      const el = viewportRef.current;
      if (!el) return;

      const prev = zoomRef.current;
      const factor = Math.exp(-deltaY * zoomSpeed);
      const next = clamp(prev * factor, minZoom, maxZoom);

      const rect = el.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;

      const worldX = (el.scrollLeft + mx) / prev;
      const worldY = (el.scrollTop + my) / prev;

      setZoom(next);

      requestAnimationFrame(() => {
        const el2 = viewportRef.current;
        if (!el2) return;

        el2.scrollLeft = worldX * next - mx;
        el2.scrollTop = worldY * next - my;
      });
    },
    [minZoom, maxZoom, zoomSpeed],
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const pinch = e.ctrlKey || (allowMetaKey && e.metaKey);
      if (!pinch) return;
      e.preventDefault();
      zoomAtPointer(e.clientX, e.clientY, e.deltaY);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [allowMetaKey, zoomAtPointer]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = viewportRef.current;
      if (!el) return;

      const target = e.target as HTMLElement;

      const isMiddle = e.button === 1;
      const isSpaceLeft = enableSpacePan && spaceDown && e.button === 0;

      const isBackgroundLeft =
        enableBackgroundPan && !spaceDown && e.button === 0 && !target.closest(panIgnoreSelector);

      if (!isMiddle && !isSpaceLeft && !isBackgroundLeft) return;

      e.preventDefault();
      e.stopPropagation();

      panRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: el.scrollLeft,
        startTop: el.scrollTop,
        pointerId: e.pointerId,
      };
      setIsPanning(true);
      el.setPointerCapture?.(e.pointerId);
    },
    [enableSpacePan, spaceDown, enableBackgroundPan, panIgnoreSelector],
  );

  // 패닝 이벤트 핸들러
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el || !panRef.current.active) return;

    e.preventDefault();
    e.stopPropagation();

    const dx = e.clientX - panRef.current.startX;
    const dy = e.clientY - panRef.current.startY;

    el.scrollLeft = panRef.current.startLeft - dx;
    el.scrollTop = panRef.current.startTop - dy;
  }, []);

  // 패닝 이벤트 해제 핸들러
  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const el = viewportRef.current;
    if (!el || !panRef.current.active) return;

    try {
      el.releasePointerCapture?.(panRef.current.pointerId);
    } catch {
      // ignore
    }
    panRef.current.active = false;
    setIsPanning(false);
  }, []);

  return {
    viewportRef, // 컨테이너에 ref로 연결
    zoom,
    setZoom,
    spaceDown,
    isPanning,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
    },
  };
}
