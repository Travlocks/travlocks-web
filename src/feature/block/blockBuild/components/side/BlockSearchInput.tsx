import type { TabType } from './BlockTabs';
import SearchIcon from '../../assets/icon-search.svg?react';

interface BlockSearchInputProps {
  activeTab: TabType;
  onSearch: (query: string, tab: TabType) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// TODO: 공용 서치 인풋으로 분리 가능성
const BlockSearchInput = ({ value, onChange, placeholder = '블록을 검색해보세요' }: BlockSearchInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full h-11 px-4 bg-base-color-6 border border-[#D9D9D9] rounded-[5px] max-w-[248px]">
      <SearchIcon className="w-5 h-5 text-base-color-3 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent b6 text-base-color-1 placeholder:b6 placeholder:text-base-color-3 outline-none"
      />
    </div>
  );
};

export default BlockSearchInput;
