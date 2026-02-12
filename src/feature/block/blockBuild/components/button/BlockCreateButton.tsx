import CreateIcon from '@feature/block/blockBuild/assets/edit-icon-create.svg?react';

interface BlockCreateButtonProps {
  onClick?: () => void;
}

const BlockCreateButton = ({ onClick }: BlockCreateButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-[60px] rounded-[10px] border border-dashed border-gray-400 bg-base-color-6 flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors">
      <CreateIcon />
      <span className="text-[15px] font-semibold text-gray-400">블록 생성하기</span>
    </button>
  );
};

export default BlockCreateButton;
