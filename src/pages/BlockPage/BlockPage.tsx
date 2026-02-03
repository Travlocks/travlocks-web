import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import BlockHeader from '@/feature/block/blockHeader/blockHeader';

const BlockPage = () => {
  return (
    <div className="flex flex-col h-[1091px] max-w-[1198px] w-full overflow-hidden m-auto">
      {/* TODO: 여기다가 여행 타이틀 */}
      <BlockHeader />
      <BlockEditor />
    </div>
  );
};

export default BlockPage;
