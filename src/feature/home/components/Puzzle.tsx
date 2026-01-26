import PuzzleIcon from '@assets/backgrounds/home-puzzle.svg?react';
import type { PuzzleSpec } from '../utils/puzzleLayout';
import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';

interface PuzzleProps extends PuzzleSpec {
  className?: string;
}

export function Puzzle({ size, left, startY, endY, floatSec, rotateSec, delaySec, opacity, className }: PuzzleProps) {
  const reduce = useReducedMotion();

  return (
    <div className={clsx('absolute -translate-x-1/2 -translate-y-1/2', className)} style={{ left, top: 0 }}>
      {/* float 애니메이션 */}
      <motion.div
        initial={reduce ? {} : { y: startY }}
        animate={reduce ? {} : { y: [startY, endY] }}
        transition={reduce ? undefined : { duration: floatSec, repeat: Infinity, ease: 'linear', delay: delaySec }}
        style={{ willChange: 'transform' }}>
        {/* rotate 애니메이션 */}
        <motion.div
          animate={reduce ? {} : { rotate: 360 }}
          transition={reduce ? undefined : { duration: rotateSec, repeat: Infinity, ease: 'linear', delay: delaySec }}
          style={{ willChange: 'transform' }}>
          <PuzzleIcon width={size} height={size} style={{ opacity }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
