import clsx from 'clsx';
import GoBackIcon from '@feature/block/blockBuild/assets/edit-icon-goBack.svg?react';
import { IconBase } from '@/shared/ui/icon/IconBase';

interface BlockUndoRedoProps {
  className?: string;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

const BTN_BASE =
  'flex items-center justify-center w-10 h-10 rounded-full border border-[#D9D9D9] bg-base-color-6 shadow-sm transition-opacity';

const BlockUndoRedo = ({ className, onUndo, onRedo, canUndo = false, canRedo = false }: BlockUndoRedoProps) => {
  return (
    <div className={clsx('flex items-center gap-4', className)}>
      <button
        type="button"
        aria-label="되돌리기"
        disabled={!canUndo}
        onClick={() => onUndo?.()}
        className={clsx(BTN_BASE, canUndo ? 'cursor-pointer' : 'cursor-not-allowed opacity-40')}>
        <IconBase icon={GoBackIcon} color="#FFFFFF" className="w-5 h-5" />
      </button>

      <button
        type="button"
        aria-label="다시하기"
        disabled={!canRedo}
        onClick={() => onRedo?.()}
        className={clsx(BTN_BASE, canRedo ? 'cursor-pointer' : 'cursor-not-allowed opacity-40')}>
        <IconBase icon={GoBackIcon} color="#FFFFFF" className="w-5 h-5 scale-x-[-1]" />
      </button>
    </div>
  );
};

export default BlockUndoRedo;
