import clsx from 'clsx';
import type { Block } from '../../types/block';
import { getBoundingBox } from '@/shared/components/Block/blockShape';
import BlockStart from './BlockStart';

type BlockStartNodeProps = {
  block: Block;
};

export default function BlockStartNode({ block }: BlockStartNodeProps) {
  const { w, h } = getBoundingBox(block.points);

  return (
    <div
      className={clsx('absolute select-none z-content')}
      style={{
        left: block.x,
        top: block.y,
        width: w,
        height: h,
      }}>
      <BlockStart className="w-full h-full" />
    </div>
  );
}
