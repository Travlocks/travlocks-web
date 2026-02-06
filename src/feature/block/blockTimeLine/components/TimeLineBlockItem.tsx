import BlockItemUI from '@/shared/components/Block/BlockItemUI';
import type { Block } from '../../blockBuild/types/block';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TimeLineBlockItemProps {
  block: Block;
  day: number;
}

const TimeLineBlockItem = ({ block, day }: TimeLineBlockItemProps) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: block.blockId,
    data: {
      type: 'blockTimeline',
      day,
      block,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : undefined,
        opacity: isDragging ? 0 : 100,
      }}>
      <BlockItemUI item={{ id: block.blockId, ...block }} />
    </div>
  );
};

export default TimeLineBlockItem;
