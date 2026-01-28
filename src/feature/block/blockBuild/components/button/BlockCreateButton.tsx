import CreateIcon from '@assets/blockEdit/edit-icon-create.svg?react';

const BlockCreateButton = () => {
  const onCreateBlock = () => {
    console.log('onCreateBlock');
  };

  return (
    <button
      onClick={onCreateBlock}
      className="w-full h-[60px] rounded-[10px] border border-dashed border-gray-400 bg-base-color-6 flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors">
      <CreateIcon />
      <span className="text-[15px] font-semibold text-gray-400">블록 생성하기</span>
    </button>
  );
};

export default BlockCreateButton;
