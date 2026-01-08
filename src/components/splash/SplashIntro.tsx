import splashGroupUrl from '@assets/splash/splash-group.svg?url';
import { motion } from 'motion/react';
import { SPLASH_INTRO_ANIMATION } from './utils/constants';

interface SplashIntroProps {
  onNext: () => void;
}

// 스플래시 인트로 컴포넌트
const SplashIntro = ({ onNext }: SplashIntroProps) => {
  return (
    <motion.div
      className="flex w-full h-full translate-x-[10%] items-center justify-center"
      initial={{ x: '-120%', opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{
        x: '120%',
        opacity: 1,
        transition: {
          duration: SPLASH_INTRO_ANIMATION.exitDuration,
          ease: SPLASH_INTRO_ANIMATION.ease,
        },
      }}
      transition={{
        type: SPLASH_INTRO_ANIMATION.type,
        duration: SPLASH_INTRO_ANIMATION.duration,
        ease: SPLASH_INTRO_ANIMATION.ease,
      }}>
      <div className="relative">
        <img src={splashGroupUrl} alt="splash-group" className="block select-none" draggable={false} />

        <button
          type="button"
          onClick={onNext}
          className="flex gap-2.5 absolute left-[21.5%] top-[63%] rounded-[30px] bg-primary-color px-[52px] py-[22px] hover:bg-image-gradient-color-hover cursor-pointer">
          <span className="text-base-color-6 text-t2 font-semibold">여행 조립하러 떠나기</span>
          <p className="text-white">→</p>
        </button>
      </div>
    </motion.div>
  );
};

export default SplashIntro;
