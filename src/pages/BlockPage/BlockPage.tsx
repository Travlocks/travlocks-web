import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Level } from '@/feature/block/blockBuild/types/level';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';

const BlockPage = () => {
  const { templateId } = useParams<{ templateId?: string }>();
  const setTemplateId = useBlockTemplateStore((s) => s.setTemplateId);
  const [level, setLevel] = useState<Level>('timeline');

  useEffect(() => {
    setTemplateId(templateId ?? null);
  }, [setTemplateId, templateId]);

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
