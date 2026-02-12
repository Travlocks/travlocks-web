import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import type { Level } from '@/feature/block/blockBuild/types/level';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';
import { useState } from 'react';

const TimelinePage = () => {
  const [level, setLevel] = useState<Level>('timeline');

  return (
    <div className="flex justify-center gap-[25px] w-screen overflow-hidden bg-base-color-5">
      <div className="flex flex-col max-w-[1198px] ml-[260px] w-full border-x border-base-color">
        <BlockHeader level={level} setLevel={setLevel} />
        <BlockEditor level={level} setLevel={setLevel} />
      </div>

      <BlockSummary />
    </div>
  );
};

export default TimelinePage;
