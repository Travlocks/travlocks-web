import { useState } from 'react';
import DropdownArrow from '@/shared/assets/icon-arrow-down.svg?react';
import { type VlockModalBaseDto } from '../types/vlockModal.types';
import { FormItem } from './common/FormItem';
import { Dropdown as DropdownContainer } from './common/Dropdown';
import type { BlockCategory } from '../../blockBuild/types/blockCategory.types';

interface VlockCategoryDropdownProps {
  value: VlockModalBaseDto['categoryId'];
  categories: BlockCategory[];
  onChange: (value: number) => void;
  disabled?: boolean;
}

const VlockCategoryDropdown = ({ value, categories, onChange, disabled = false }: VlockCategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    onChange(id);
    setIsOpen(false);
  };

  const selectedLabel = categories.find((category) => category.id === value)?.name ?? '유형을 선택하세요';

  const trigger = (
    <div
      className={`w-full bg-base-color-6 border border-base-color rounded-[5px] p-[14px_18px] flex justify-between items-center ${
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      }`}
      onClick={() => {
        if (disabled) return;
        setIsOpen(!isOpen);
      }}>
      <label className="b4 text-base-color-1 cursor-pointer">{value === 0 ? '유형을 선택하세요' : selectedLabel}</label>
      <div className="w-6 h-6 flex items-center justify-center">
        <DropdownArrow className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );

  return (
    <FormItem label="Vlock 유형" required={true}>
      <DropdownContainer isOpen={isOpen} onClose={() => setIsOpen(false)} trigger={trigger}>
        {categories.length === 0 ? (
          <div className="p-[14px_18px] b6 text-base-color-2">카테고리를 불러오는 중입니다.</div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="p-[14px_18px] b6 text-base-color-3 hover:bg-base-color-5 cursor-pointer transition-colors"
              onClick={() => handleSelect(category.id)}>
              {category.name}
            </div>
          ))
        )}
      </DropdownContainer>
    </FormItem>
  );
};

export default VlockCategoryDropdown;
