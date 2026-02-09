import type { FilterTag } from '../types/searchTemplate.types';
import DeleteIcon from '@/shared/assets/icon-x.svg?react';
import { TagStyle } from '@/feature/search/style/Tag.style';

/**
 * 필터 태그 컴포넌트의 Props
 */
interface FilterTagsProps {
  /** 표시할 필터 태그 배열 */
  tags: FilterTag[];

  /** 태그 제거 시 호출되는 콜백 함수 */
  onRemove: (tag: FilterTag) => void;
}

/**
 * 선택된 필터를 태그 형태로 표시하는 컴포넌트
 *
 * @remarks
 * - 각 태그는 레이블과 삭제 버튼을 포함합니다.
 * - 태그가 많을 경우 가로 스크롤 가능하며, 스크롤바는 시각적으로 숨겨집니다.
 *
 * @param props - FilterTagsProps
 */
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
