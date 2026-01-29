import clsx from 'clsx';
import type { DockHintState } from '../../types/drag';

export default function BlockGhost({ hint }: { hint: DockHintState }) {
  if (!hint?.visible) return null;

  return (
    <div
      className="absolute z-content pointer-events-none"
      style={{ left: hint.x, top: hint.y, width: hint.w, height: hint.h }}>
      {/* TODO: 퍼즐 가까이 다가갔을 때 힌트 컴포넌트 여기다가 추가 */}
      {/* 지금은 임시 */}
      <div className={clsx('w-full h-full rounded-xl border-2 border-dashed border-blue-500 bg-blue-200/20')} />

      {/* TODO: 오른쪽 방향 들어갈떄 컴포넌트 추가 */}
      {hint.side === 'right' && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full border-2 border-dashed border-blue-500 bg-blue-200/20" />
      )}
      {/* TODO: 아래쪽 방향 들어갈떄 컴포넌트 추가 */}
      {hint.side === 'bottom' && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full border-2 border-dashed border-blue-500 bg-blue-200/20" />
      )}
    </div>
  );
}
