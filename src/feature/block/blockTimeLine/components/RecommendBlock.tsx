import BlockItemUI from '@/shared/components/Block/BlockItemUI';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Vlock } from '@/feature/block/blockTimeLine/types/block';
import type { CategoryType, SidebarBlock } from '../../blockBuild/types/block';

interface RecommendDraggableBlockProps {
  item: Vlock;
}

const RecommendDraggableBlock = ({ item }: RecommendDraggableBlockProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `recommend-${item.vlockId}`,
    data: {
      type: 'blockSidebar',
      item: {
        id: item.vlockId,
        name: item.name,
        category: item.categoryName as CategoryType,
        duration: `${item.stayhours} 시간`,
        imageUrl: item.coverImgUrl,
      } satisfies SidebarBlock,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-full">
      <BlockItemUI item={item} />
    </div>
  );
};

export default RecommendDraggableBlock;
