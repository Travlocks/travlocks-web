import { clamp } from '@/feature/home/utils/random';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type InitialScroll = { left: number; top: number } | ((ctx: { zoom: number }) => { left: number; top: number });

type Options = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
  zoomSpeed?: number;
  allowMetaKey?: boolean; // macos 핀치
  enableSpacePan?: boolean;
  enableBackgroundPan?: boolean;
  panIgnoreSelector?: string; // 패닝 무시할 요소 선택자 ('data-pan-ignore')
  initialScroll?: InitialScroll; // 초기 스크롤 위치
  runInitialScrollOnce?: boolean;
};

export function useCanvasPanZoom(options: Options = { zoom: 1, onZoomChange: () => {} }) {
  const {
    zoom,
    onZoomChange,
    minZoom = 0.5,
    maxZoom = 2,
    zoomSpeed = 0.003,
    allowMetaKey = true,
    enableSpacePan = true,
    enableBackgroundPan = true,
    panIgnoreSelector = '[data-pan-ignore]',
    initialScroll,
    runInitialScrollOnce = true,
  } = options;

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const zoomRef = useRef(zoom);
  // 줌 값 참조 동기화
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const panRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    pointerId: -1,
  });
  // 초기 스크롤 위치 초기화 여부
  const viewInitRef = useRef(false);

  const pendingScrollRef = useRef<{ left: number; top: number } | null>(null);
  // 초기 스크롤 위치 초기화 핸들러
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (!initialScroll) return;

    if (runInitialScrollOnce && viewInitRef.current) return;

    const v = typeof initialScroll === 'function' ? initialScroll({ zoom }) : initialScroll;

    el.scrollLeft = v.left;
    el.scrollTop = v.top;

    viewInitRef.current = true;
  }, [initialScroll, runInitialScrollOnce, zoom]);

  const [spaceDown, setSpaceDown] = useState(false);
  const [isPanning, setIsPanning] = useState(false);

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

  // 줌 값 참조 동기화 및 스크롤 위치 업데이트
  useLayoutEffect(() => {
    zoomRef.current = zoom;

    const el = viewportRef.current;
    const pending = pendingScrollRef.current;

    if (!el || !pending) return;

    el.scrollLeft = pending.left;
    el.scrollTop = pending.top;
    pendingScrollRef.current = null;
  }, [zoom]);

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

      pendingScrollRef.current = {
        left: worldX * next - mx,
        top: worldY * next - my,
      };

      onZoomChange(next);
    },
    [minZoom, maxZoom, zoomSpeed, onZoomChange],
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
    if (!panRef.current.active) return;

    e.preventDefault();
    e.stopPropagation();

    const el = viewportRef.current;
    if (!el) {
      panRef.current.active = false;
      setIsPanning(false);
      return;
    }

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
    onZoomChange,
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
