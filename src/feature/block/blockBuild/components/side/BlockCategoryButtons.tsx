import { useState } from 'react';
import type { CategoryType } from '../../types/block';
import clsx from 'clsx';

// TODO: api로 불러오기
const CATEGORIES: CategoryType[] = ['식당', '카페', '쇼핑', '문화', '숙소', '액티비티', '투어', '기타'];
const ITEMS_PER_ROW = 4;

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton = ({ label, isActive, onClick }: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-3 px-3 py-2 text-[14px] b6 rounded-[20px] transition-colors',
        isActive ? 'bg-primary-color text-base-color-6' : 'bg-base-color-4 text-base-color-0',
      )}>
      {label}
    </button>
  );
};

const BlockCategoryButtons = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('식당');

  const rows = Array.from({ length: Math.ceil(CATEGORIES.length / ITEMS_PER_ROW) }, (_, rowIndex) =>
    CATEGORIES.slice(rowIndex * ITEMS_PER_ROW, (rowIndex + 1) * ITEMS_PER_ROW),
  );

  return (
    <div className="flex flex-col gap-3 pb-[17px]">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-3">
          {row.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BlockCategoryButtons;
