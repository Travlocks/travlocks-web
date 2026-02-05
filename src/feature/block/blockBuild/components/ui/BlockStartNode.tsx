import clsx from 'clsx';
import type { Block } from '../../types/block';
import BlockStart from './BlockStart';

type BlockStartNodeProps = {
  block: Block;
};

export default function BlockStartNode({ block }: BlockStartNodeProps) {
  return (
    <div
      className={clsx('absolute select-none z-content')}
      style={{
        left: block.x,
        top: block.y,
        width: block.w,
        height: block.h,
      }}>
      <BlockStart className="w-full h-full" />
    </div>
  );
}
