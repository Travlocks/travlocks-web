import clsx from 'clsx';
import type { BlockCategory } from '../../types/blockCategory.types';

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

interface BlockCategoryButtonsProps {
  categories: BlockCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number) => void;
}

const BlockCategoryButtons = ({ categories, selectedCategoryId, onSelectCategory }: BlockCategoryButtonsProps) => {
  const rows = Array.from({ length: Math.ceil(categories.length / ITEMS_PER_ROW) }, (_, rowIndex) =>
    categories.slice(rowIndex * ITEMS_PER_ROW, (rowIndex + 1) * ITEMS_PER_ROW),
  );

  return (
    <div className="flex flex-col gap-3 pb-[17px]">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-3">
          {row.map((category) => (
            <CategoryButton
              key={category.id}
              label={category.name}
              isActive={selectedCategoryId === category.id}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BlockCategoryButtons;
