import TrashIcon from '@assets/blockEdit/edit-icon-trash.svg?react';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';

const BlockTrash = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'blockTrash',
  });

  return (
    <div ref={setNodeRef} className={clsx('w-20 h-20', isOver ? 'bg-blue-50/30' : 'bg-[#F8FAFC]')}>
      {/* TODO: 로티파일로 변경 */}
      <TrashIcon className="w-20 h-20" />
    </div>
  );
};

export default BlockTrash;
