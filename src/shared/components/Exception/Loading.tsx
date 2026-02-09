import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadingAnimation from '@assets/exceptions/loading.lottie';
import { getLottieSrc } from '@/shared/utils/lottiePreloader';

const Loading = () => {
  const cachedLottieSrc = getLottieSrc() || loadingAnimation;

  return (
    <div className="fixed inset-0 z-tooltip flex flex-col items-center justify-center">
      <div className="bg-base-color-1 opacity-60 fixed inset-0" />
      <div className="relative w-[1500px] h-[900px] flex flex-col">
        <DotLottieReact src={cachedLottieSrc} loop autoplay className="w-[1500px] z-header" mode="bounce" />
        <div className="absolute top-[500px] left-1/2 -translate-x-1/2 mt-4 h5 text-base-color-6 z-header whitespace-nowrap">
          화면을 구성하고 있어요 ..
        </div>
      </div>
    </div>
  );
};

export default Loading;
