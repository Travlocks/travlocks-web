import { type DotLottie } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';

export const useLottie = (isOver?: boolean) => {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null); // 로티 애니메이션 인스턴스
  const [isLottieDone, setIsLottieDone] = useState<boolean>(false); // 로티 에니메이션 종료 여부

  // complete 이벤트 리스너
  useEffect(() => {
    const onComplete = () => {
      setIsLottieDone(true);
    };
    if (dotLottie) {
      dotLottie.addEventListener('complete', onComplete);
    }
    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener('complete', onComplete);
      }
    };
  }, [dotLottie]);

  // hover 이벤트 리스너
  useEffect(() => {
    if (!dotLottie || isOver === undefined) return;

    if (isOver) {
      // hover 시: forward 모드 (정방향 재생 - 열리는 애니메이션)
      dotLottie.setMode('forward');
      dotLottie.play();
    } else {
      // hover 해제 시: reverse 모드 (역재생 - 닫히는 애니메이션)
      dotLottie.setMode('reverse');
      dotLottie.play();
    }
  }, [isOver, dotLottie]);

  return { dotLottie, isLottieDone, setDotLottie };
};
