import RoundButton from '@/shared/components/Button/RoundButton';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const container: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.0,
      staggerChildren: 0.12,
      delay: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export const HeroTitle = () => {
  const reduce = useReducedMotion();
  const click = () => {
    console.log('click');
  };
  return (
    <motion.div
      className="pointer-events-auto flex flex-col items-center"
      variants={container}
      initial="hidden"
      animate={reduce ? undefined : 'show'}>
      <motion.h1 className="h1 mb-[13px] tracking-[0.352px] text-center" variants={item}>
        조립하는 즐거움, <br />
        나만의 여행 블록 쌓기
      </motion.h1>

      <motion.p className="h9 text-base-color-1 mb-[30px] text-center" variants={item}>
        복잡한 여행 계획을 간단하게 만드는 가장 쉬운 방법
      </motion.p>

      <motion.div variants={item} className="w-full max-w-[292px]">
        <RoundButton text="여행 조립하러 떠나기" isAnimated={true} width={292} onClick={click} />
      </motion.div>
    </motion.div>
  );
};
