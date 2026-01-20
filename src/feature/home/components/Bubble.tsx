import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import styles from './bubble.module.css';
import type { BubbleSpec } from '../utils/bubbleLayout';

interface BubbleProps extends BubbleSpec {
  className?: string;
}

export function Bubble({
  variant,
  size,
  floatSec,
  rotateSec = 10,
  delaySec = 0,
  startY,
  endY,
  opacity = 1,
  left,
  className,
}: BubbleProps) {
  const reduce = useReducedMotion();
  return (
    <div className={clsx('absolute -translate-x-1/2 -translate-y-1/2', className)} style={{ left, top: 0 }}>
      {/* float 애니메이션 */}
      <motion.div
        animate={reduce ? {} : { y: [startY, endY] }}
        transition={reduce ? undefined : { duration: floatSec, repeat: Infinity, ease: 'linear', delay: delaySec }}
        style={{ willChange: 'transform' }}>
        {/* rotate 애니메이션 */}
        <motion.div
          animate={reduce ? {} : { rotate: 360 }}
          transition={reduce ? undefined : { duration: rotateSec, repeat: Infinity, ease: 'linear', delay: delaySec }}
          style={{ willChange: 'transform' }}>
          <div
            className={clsx(styles.bubble, variant === 'a' ? styles['bubble--a'] : styles['bubble--b'])}
            style={{ ['--bubble-size']: `${size}px`, opacity } as React.CSSProperties}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
