import TrashAnimation from '@feature/block/blockBuild/assets/trash-animation.lottie';
import { useDroppable } from '@dnd-kit/core';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLottie } from '@/shared/hooks/useLottie';
import clsx from 'clsx';

const BlockTrash = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'blockTrash',
  });
  const { setDotLottie } = useLottie(isOver);

  return (
    <div ref={setNodeRef} className={clsx('w-25 h-25')}>
      <DotLottieReact
        src={TrashAnimation}
        loop={false}
        autoplay={false}
        speed={1.5}
        dotLottieRefCallback={setDotLottie}
      />
    </div>
  );
};

export default BlockTrash;
