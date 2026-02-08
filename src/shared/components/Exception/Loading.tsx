import { useMemo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import clsx from 'clsx';
import loadingAnimation from '@assets/exceptions/loading.lottie';

interface LoadingProps {
  fullScreen?: boolean;
  className?: string;
}

const Loading = ({ fullScreen = false, className }: LoadingProps) => {
  const renderConfig = useMemo(
    () => ({
      freezeOnOffscreen: false,
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      autoResize: false,
    }),
    [],
  );

  return (
    <div
      className={clsx(
        'relative flex flex-col items-center justify-center loading-backdrop',
        fullScreen && 'fixed inset-0 z-max',
        className,
      )}>
      <div className="w-[700px] h-[700px] flex items-center justify-center">
        <DotLottieReact
          src={loadingAnimation}
          loop
          autoplay
          useFrameInterpolation={true}
          renderConfig={renderConfig}
          className="w-full h-full"
          mode="bounce"
          style={{
            transform: 'translateZ(0) scale(0.5)',
            willChange: 'transform',
            imageRendering: 'auto',
          }}
        />
      </div>
      <p className="absolute top-[calc(50%+110px+16px)] h5 text-base-color-6 whitespace-nowrap">
        화면을 구성하고 있어요 ..
      </p>
    </div>
  );
};

export default Loading;
