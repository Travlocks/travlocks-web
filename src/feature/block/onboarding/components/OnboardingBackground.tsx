import { motion } from 'motion/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PuzzleIcon from '@assets/draft/icon-draft-puzzle.svg?react';
import OnboardingAnimation from '../assests/onboarding.lottie';

const OnboardingBackground = () => {
  // 퍼즐 아이콘들이 랜덤한 위치에서 시작하여 위로 떠오르는 애니메이션
  const puzzles = [
    { id: 1, left: '5%', size: 80, delay: 0, duration: 15, rotate: 10 },
    { id: 2, left: '15%', size: 120, delay: 2, duration: 18, rotate: -15 },
    { id: 3, left: '75%', size: 100, delay: 5, duration: 20, rotate: 20 },
    { id: 4, left: '85%', size: 90, delay: 1, duration: 12, rotate: -10 },
    { id: 5, left: '40%', size: 70, delay: 8, duration: 25, rotate: 5 },
    { id: 6, left: '60%', size: 110, delay: 3, duration: 17, rotate: -20 },
  ];

  return (
    <div className="w-full h-full pointer-events-none overflow-hidden">
      {/* 퍼즐 아이콘*/}
      {puzzles.map((puzzle) => (
        <motion.div
          key={puzzle.id}
          className="absolute"
          style={{ left: puzzle.left, bottom: '-200px' }}
          initial={{ y: 0, x: 0, rotate: puzzle.rotate }}
          animate={{
            y: -2000,
            x: [0, 20, -20, 0],
            rotate: [puzzle.rotate - 10, puzzle.rotate + 10, puzzle.rotate - 10],
          }}
          transition={{
            y: {
              duration: puzzle.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: puzzle.delay,
            },
            x: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}>
          <PuzzleIcon style={{ width: puzzle.size, height: puzzle.size }} className="opacity-30 text-base-color-4" />
        </motion.div>
      ))}

      {/* 캐릭터 Lottie 애니메이션*/}
      <div className="absolute top-0 left-0 w-full h-[468px] overflow-hidden flex items-center justify-center">
        <DotLottieReact src={OnboardingAnimation} loop autoplay className="w-[80%] h-full object-cover opacity-90" />
      </div>
    </div>
  );
};

export default OnboardingBackground;
