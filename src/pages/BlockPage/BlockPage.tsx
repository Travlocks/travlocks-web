import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';

const BlockPage = () => {
  return (
    <div className="flex justify-center gap-[25px] w-screen overflow-hidden bg-base-color-5">
      {/* TODO: 여기다가 여행 타이틀 */}
      <div className="flex flex-col max-w-[1198px] w-full border-x border-base-color">
        <BlockHeader />
        <BlockEditor />
      </div>

      <BlockSummary />
    </div>
  );
};

export default BlockPage;
