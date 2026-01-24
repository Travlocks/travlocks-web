import { useMemo } from 'react';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { type IconName } from '@/shared/ui/icon/registry';
import { createBlockPath, type BlockConnections } from './blockShape';
import { BlockContent } from './BlockContent';
import { BlockDurationBadge } from './BlockDurationBadge';

interface BlockProps {
  title: string;
  category: string;
  duration: string;
  icon?: IconName;
  className?: string;
  connections?: BlockConnections;
  width?: number;
  height?: number;
}

const TAB_HEIGHT = 16;
const TAB_WIDTH = 40;
const DEFAULT_SIZE = 160;
const RADIUS = 24;

export const Block = ({
  title,
  category,
  duration,
  icon = 'food',
  className,
  connections = [],
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
}: BlockProps) => {
  const effectiveConnections: BlockConnections =
    connections.length === 0
      ? [
          { direction: 'top', type: 'plug', align: 'center' },
          { direction: 'right', type: 'socket', align: 'center' },
          { direction: 'bottom', type: 'socket', align: 'center' },
          { direction: 'left', type: 'plug', align: 'center' },
        ]
      : connections;

  const clipPath = useMemo(
    () => createBlockPath(width, height, RADIUS, TAB_WIDTH, TAB_HEIGHT, effectiveConnections),
    [effectiveConnections, width, height],
  );

  // Total size calculation
  const totalWidth = width + TAB_HEIGHT * 2;
  const totalHeight = height + TAB_HEIGHT * 2;

  return (
    <div className={`relative drop-shadow-md ${className}`} style={{ width: totalWidth, height: totalHeight }}>
      {/* Clipped Shape */}
      <div className="w-full h-full bg-[#fd7565] text-white" style={{ clipPath: `path('${clipPath}')` }}>
        {/* Content Container - Positioned to align with the Body (160x160) */}
        <div
          className="absolute flex flex-col p-5"
          style={{
            top: TAB_HEIGHT,
            left: TAB_HEIGHT,
            width: width,
            height: height,
          }}>
          <BlockContent icon={icon} category={category} title={title} />

          <div className="absolute bottom-5 left-5">
            <BlockDurationBadge duration={duration} />
          </div>
          <div className="absolute bottom-[18px] right-[18px]">
            <AppIcon name="dragHandle" width={20} height={20} className="opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
