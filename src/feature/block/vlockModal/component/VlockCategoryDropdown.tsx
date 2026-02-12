import { useState } from 'react';
import { VLOCK_CATEGORY_OPTIONS, VLOCK_CATEGORY_MAP, type vlockCategoryId } from '@/shared/constants/vlockCategory';
import DropdownArrow from '@/shared/assets/icon-arrow-down.svg?react';
import { type VlockModalBaseDto } from '../types/vlockModal.types';
import { FormItem } from './common/FormItem';
import { Dropdown as DropdownContainer } from './common/Dropdown';

interface VlockCategoryDropdownProps {
  value: VlockModalBaseDto['categoryId'];
  onChange: (value: vlockCategoryId) => void;
}

const VlockCategoryDropdown = ({ value, onChange }: VlockCategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: vlockCategoryId) => {
    onChange(id);
    setIsOpen(false);
  };

  const trigger = (
    <div
      className="w-full bg-base-color-6 border border-base-color rounded-[5px] p-[14px_18px] flex justify-between items-center cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}>
      <label className="b4 text-base-color-1 cursor-pointer">
        {value === 0 ? '유형을 선택하세요' : VLOCK_CATEGORY_MAP[value as vlockCategoryId] || '유형을 선택하세요'}
      </label>
      <div className="w-6 h-6 flex items-center justify-center">
        <DropdownArrow className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );

  return (
    <FormItem label="Vlock 유형" required={true}>
      <DropdownContainer isOpen={isOpen} onClose={() => setIsOpen(false)} trigger={trigger}>
        {VLOCK_CATEGORY_OPTIONS.map((opt) => (
          <div
            key={opt.id}
            className="p-[14px_18px] b6 text-base-color-3 hover:bg-base-color-5 cursor-pointer transition-colors"
            onClick={() => handleSelect(opt.id)}>
            {opt.key}
          </div>
        ))}
      </DropdownContainer>
    </FormItem>
  );
};

export default VlockCategoryDropdown;
