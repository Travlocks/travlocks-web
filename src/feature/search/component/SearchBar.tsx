import React, { useEffect } from 'react';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';
import SearchIcon from '@/shared/assets/icon-search.svg?react';
import { SearchBarStyles } from '@feature/search/style/SearchBar.style';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

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
