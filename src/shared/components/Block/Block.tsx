import { useMemo } from 'react';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { type IconName } from '@/shared/ui/icon/registry';
import { createPolygonBlockPath, type Connector, type Point } from './blockShape';
import { BlockContent } from './BlockContent';
import { BlockDurationBadge } from './BlockDurationBadge';

interface BlockProps {
  title: string;
  category: string;
  duration: string;
  icon?: IconName;
  className?: string;
  connections?: Connector[];
  points: Point[];
}

const TAB_HEIGHT = 16;
const TAB_WIDTH = 40;
const RADIUS = 24;

export const Block = ({
  title,
  category,
  duration,
  icon = 'food',
  className,
  connections = [],
  points,
}: BlockProps) => {
  const clipPath = useMemo(() => {
    return createPolygonBlockPath(points, RADIUS, TAB_WIDTH, TAB_HEIGHT, connections);
  }, [points, connections]);

  // Dimension Calculation
  const { totalWidth, totalHeight, contentTop, contentLeft, contentWidth, contentHeight } = useMemo(() => {
    if (!points || points.length === 0) {
      return { totalWidth: 0, totalHeight: 0, contentTop: 0, contentLeft: 0, contentWidth: 0, contentHeight: 0 };
    }
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      totalWidth: maxX,
      totalHeight: maxY,
      contentTop: minY,
      contentLeft: minX,
      contentWidth: maxX - minX,
      contentHeight: maxY - minY,
    };
  }, [points]);

  return (
    <div className={`relative drop-shadow-md ${className}`} style={{ width: totalWidth, height: totalHeight }}>
      <div className="w-full h-full bg-negative text-white" style={{ clipPath: `path('${clipPath}')` }}>
        <div
          className="absolute flex flex-col p-5"
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
    </div>
  );
};
