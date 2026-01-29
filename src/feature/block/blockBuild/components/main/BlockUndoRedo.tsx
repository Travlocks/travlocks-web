import clsx from 'clsx';
import GoBackIcon from '@feature/block/blockBuild/assets/edit-icon-goBack.svg?react';
import { IconBase } from '@/shared/ui/icon/IconBase';

interface BlockUndoRedoProps {
  className?: string;
}

const BUTTON_TYPE = {
  common: {
    className:
      'flex items-center justify-center w-10 h-10 rounded-full border border-[#D9D9D9] bg-base-color-6 shadow-sm cursor-pointer',
  },
  undo: {
    icon: GoBackIcon,
    color: '#FFFFFF',
    className: 'w-5 h-5',
  },
  redo: {
    icon: GoBackIcon,
    color: '#FFFFFF',
    className: 'w-5 h-5 scale-x-[-1]',
  },
};

const BlockUndoRedo = ({ className }: BlockUndoRedoProps) => {
  return (
    <div className={clsx('flex items-center gap-4', className)}>
      {/* Undo */}
      <button type="button" aria-label="되돌리기" className={clsx(BUTTON_TYPE.common.className)}>
        <IconBase icon={BUTTON_TYPE.undo.icon} color={BUTTON_TYPE.undo.color} className={BUTTON_TYPE.undo.className} />
      </button>

      {/* Redo */}
      <button type="button" aria-label="다시하기" className={clsx(BUTTON_TYPE.common.className)}>
        <IconBase icon={BUTTON_TYPE.redo.icon} color={BUTTON_TYPE.redo.color} className={BUTTON_TYPE.redo.className} />
      </button>
    </div>
  );
};

export default BlockUndoRedo;
