import createIcon from '@assets/icon-create.svg';

interface Props {
  onClick?: () => void;
}

const BlockCreateButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-[60px] rounded-[10px] border border-dashed border-gray-400 bg-white flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors">
      <img src={createIcon} alt="create" className="w-4 h-4" />
      <span className="text-[15px] font-semibold text-gray-400">블록 생성하기</span>
    </button>
  );
};

export default BlockCreateButton;
