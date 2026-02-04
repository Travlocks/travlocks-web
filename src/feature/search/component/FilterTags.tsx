import type { FilterTag } from '../types/searchTemplate.types';
import DeleteIcon from '@/shared/assets/icon-x.svg?react';
import { TagStyle } from '@/feature/search/style/Tag.style';

interface FilterTagsProps {
  tags: FilterTag[];
  onRemove: (tag: FilterTag) => void;
}

const FilterTags = ({ tags, onRemove }: FilterTagsProps) => {
  return (
    <div className="flex-1 flex flex-row items-center gap-[24px] overflow-x-auto flex-nowrap scrollbar-hide">
      {tags.map((tag) => (
        <div key={tag.id} className={TagStyle.tag}>
          <span>{tag.label}</span>
          <div className={TagStyle.deleteIconWrapper} onClick={() => onRemove(tag)}>
            <DeleteIcon className={TagStyle.deleteIcon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterTags;
