import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Level } from '@/feature/block/blockBuild/types/level';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';
// import TemplateModal from '@/feature/block/vlockModal/TemplateModal';
// import { useShallow } from 'zustand/react/shallow';

const BlockPage = () => {
  const { templateId } = useParams<{ templateId?: string }>();
  // const templateIdNum = templateId ? Number(templateId) : null;
  const setTemplateId = useBlockTemplateStore((s) => s.setTemplateId);
  const [level, setLevel] = useState<Level>('timeline');
  const [isSummaryUpdating, setIsSummaryUpdating] = useState(false);
  // const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // const { templateTitle, templateDescription, templateCoverImageUrl } = useBlockTemplateStore(
  //   useShallow((s) => ({
  //     templateTitle: s.templateTitle,
  //     templateDescription: s.templateDescription,
  //     templateCoverImageUrl: s.templateCoverImageUrl,
  //   })),
  // );
  // const setTemplateInfo = useBlockTemplateStore((s) => s.setTemplateInfo);

  useEffect(() => {
    setTemplateId(templateId ?? null);
  }, [setTemplateId, templateId]);

  return (
    <div className="flex justify-center bg-base-color-5 px-3 relative">
      <div className="flex flex-col max-w-[1100px] w-full border-x border-base-color">
        {/* <BlockHeader level={level} setLevel={setLevel} onTemplateModalOpenChange={setIsTemplateModalOpen} /> */}
        <BlockHeader level={level} setLevel={setLevel} />
        <BlockEditor level={level} setLevel={setLevel} onSummaryUpdatingChange={setIsSummaryUpdating} />
      </div>

      <div className="hidden xl:block absolute left-[calc(50%+575px)] ">
        <BlockSummary isSyncUpdating={isSummaryUpdating} />
      </div>

      {/* {isTemplateModalOpen && templateIdNum != null && (
        <TemplateModal
          templateId={templateIdNum}
          title={templateTitle}
          description={templateDescription}
          coverImgUrl={templateCoverImageUrl}
          onClose={() => setIsTemplateModalOpen(false)}
          onSuccess={(data) => {
            setTemplateInfo({
              title: data.title,
              description: data.description,
              coverImageUrl: data.coverImageUrl,
            });
          }}
        />
      )} */}
    </div>
  );
};

export default BlockPage;
