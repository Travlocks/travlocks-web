import ClockIcon from '@feature/block/blockBuild/assets/edit-icon-clock.svg?react';
import DefaultBlockIconUrl from '@feature/block/blockBuild/assets/icon-default-block.svg?url';
import clsx from 'clsx';
import type { SidebarBlock } from '@/feature/block/blockBuild/types/block';
import { blockItemStyles, categoryColor } from '@/feature/block/blockBuild/components/side/block-styles';
import type { Vlock } from '@/feature/block/blockTimeLine/types/block';

interface BlockItemUIProps {
  item: SidebarBlock | Vlock;
}

const BlockItemUI = ({ item }: BlockItemUIProps) => {
  const getImgUrl = (item: SidebarBlock | Vlock) => {
    if ('imageUrl' in item) return item.imageUrl;
    if ('coverImgUrl' in item) return item.coverImgUrl;
    return undefined;
  };

  const imageURL = getImgUrl(item);

  const getCategory = (item: SidebarBlock | Vlock) => {
    if ('category' in item) return item.category;
    if ('categoryName' in item) return item.categoryName;

    return undefined;
  };

  const category = getCategory(item);

  const getHours = (item: SidebarBlock | Vlock) => {
    if ('duration' in item) return item.duration;
    if ('stayhours' in item) return `${item.stayhours} 시간`;

    return undefined;
  };

  const duration = getHours(item);

  return (
    <button
      className={clsx(
        'relative w-full h-21 rounded-[10px] border border-gray-200 bg-base-color-6 flex items-center gap-3 p-3',
        'cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md',
      )}>
      {/* 이미지 영역 */}
      <div className="w-16 h-16 rounded-[10px] bg-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
        {imageURL ? (
          <img
            src={imageURL}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DefaultBlockIconUrl;
            }}
          />
        ) : (
          // 빈 이미지 영역
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* 텍스트 정보 */}
      <div className="flex flex-col items-start text-left">
        {/* 카테고리 */}
        <span className={clsx(blockItemStyles.smallText, categoryColor[category as keyof typeof categoryColor])}>
          {category}
        </span>

        {/* 이름 */}
        <span className={blockItemStyles.title}>{item.name}</span>

        {/* 시간 */}
        <div className="flex items-center gap-1">
          <ClockIcon />
          <span className={clsx(blockItemStyles.smallText, blockItemStyles.time)}>{duration}</span>
        </div>
      </div>
    </button>
  );
};

export default BlockItemUI;
