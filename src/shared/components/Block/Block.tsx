import { useMemo } from 'react';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { type IconName } from '@/shared/ui/icon/registry';
import { createPolygonBlockPath, type Connector, type Point } from './blockShape';
import { BlockContent } from './BlockContent';
import { BlockDurationBadge } from './BlockDurationBadge';
import clsx from 'clsx';

interface BlockProps {
  title: string;
  category: string;
  duration: string;
  icon?: IconName;
  color?: string;
  className?: string;
  connections?: Connector[];
  points: Point[];
}

const TAB_HEIGHT = 16;
const TAB_WIDTH = 42;
const RADIUS = 5;

export const Block = ({
  title,
  category,
  duration,
  icon = 'food',
  color = 'text-negative',
  className,
  connections = [],
  points,
}: BlockProps) => {
  const { totalWidth, totalHeight, contentTop, contentLeft, contentWidth, contentHeight, normalizedPoints } =
    useMemo(() => {
      if (!points || points.length === 0) {
        return {
          totalWidth: 0,
          totalHeight: 0,
          contentTop: 0,
          contentLeft: 0,
          contentWidth: 0,
          contentHeight: 0,
          normalizedPoints: [],
        };
      }
      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const w = maxX - minX;
      const h = maxY - minY;

      const normalized = points.map((p) => ({ x: p.x - minX, y: p.y - minY }));

      return {
        totalWidth: w,
        totalHeight: h,
        contentTop: 0,
        contentLeft: 0,
        contentWidth: w,
        contentHeight: h,
        normalizedPoints: normalized,
      };
    }, [points]);

  const pathD = useMemo(() => {
    return createPolygonBlockPath(normalizedPoints, RADIUS, TAB_WIDTH, TAB_HEIGHT, connections);
  }, [normalizedPoints, connections]);

  return (
    <div className={`relative ${className}`} style={{ width: totalWidth, height: totalHeight }}>
      {/* SVG Layer */}
      <svg
        className={clsx('absolute top-0 left-0 w-full h-full overflow-visible drop-shadow-md', color)}
        style={{ pointerEvents: 'none' }}>
        <path d={pathD} fill="currentColor" style={{ pointerEvents: 'auto' }} />
      </svg>

      {/* Content Layer */}
      <div
        className="absolute flex flex-col p-5 text-white"
        style={{
          top: contentTop,
          left: contentLeft,
          width: contentWidth,
          height: contentHeight,
        }}>
        <div className="flex flex-col gap-2">
          <BlockContent icon={icon} category={category} title={title} />
          <BlockDurationBadge duration={duration} />
        </div>
        <div className="absolute bottom-4.5 right-4.5">
          <AppIcon name="dragHandle" width={20} height={20} className="opacity-80" />
        </div>
      </div>
    </div>
  );
};
