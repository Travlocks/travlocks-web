import React, { useEffect } from 'react';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';
import SearchIcon from '@/shared/assets/icon-search.svg?react';
import { SearchBarStyles } from '@feature/search/style/SearchBar.style';

/**
 * 템플릿 검색바 컴포넌트의 Props
 */
interface SearchBarProps {
  /** 검색어 변경 시 호출되는 콜백 함수 */
  onSearch: (keyword: string) => void;

  /** 입력 필드 placeholder 텍스트 */
  placeholder?: string;
}

/**
 * 템플릿 탐색 페이지의 검색바 컴포넌트
 *
 * @remarks
 * - 사용자 입력을 300ms 디바운싱하여 불필요한 API 호출을 방지합니다.
 * - 디바운싱된 값이 변경될 때마다 onSearch 콜백이 호출됩니다.
 * - 검색 아이콘과 함께 시각적으로 강조된 입력 필드를 제공합니다.
 *
 * @param props - SearchBarProps
 */
const SearchBar = ({ onSearch, placeholder = '입력해주세요.' }: SearchBarProps) => {
  const { inputProps, debouncedValue } = useDebouncedInputProps({
    delay: 300,
    submit: () => {},
  });

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={SearchBarStyles.container}>
      <div className={SearchBarStyles.searchIconWrapper}>
        <SearchIcon className={SearchBarStyles.searchIcon} />
      </div>
      <input type="text" {...inputProps} placeholder={placeholder} className={SearchBarStyles.input} />
    </div>
  );
};

export default SearchBar;
