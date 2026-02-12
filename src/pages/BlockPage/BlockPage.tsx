import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import type { Level } from '@/feature/block/blockBuild/types/level';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';
import { useState } from 'react';

const BlockPage = () => {
  const [level, setLevel] = useState<Level>('timeline');

  return (
    <div className="flex justify-center bg-base-color-5 px-3 relative">
      <div className="flex flex-col max-w-[1100px] w-full border-x border-base-color">
        <BlockHeader level={level} setLevel={setLevel} />
        <BlockEditor level={level} setLevel={setLevel} />
      </div>

      <div className="max-2xl:hidden absolute left-[calc(50%+575px)] ">
        <BlockSummary />
      </div>
    </div>
  );
};

export default BlockPage;
