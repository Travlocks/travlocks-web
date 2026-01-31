import clsx from 'clsx';
import type { DockHintState } from '../../types/drag';
import { useBlockPath } from '@/shared/components/Block/blockShape';

export default function BlockGhost({ hint }: { hint: DockHintState }) {
  const pathD = useBlockPath(hint?.points || [], hint?.connectors || []);

  if (!hint?.visible) return null;

  return (
    <div className="absolute z-content pointer-events-none" style={{ left: hint.x, top: hint.y }}>
      <svg
        className={clsx('absolute top-0 left-0 overflow-visible opacity-30', hint.color || 'text-blue-500')}
        style={{ pointerEvents: 'none' }}>
        <path d={pathD} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}
