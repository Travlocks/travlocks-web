import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';

import logoMainUrl from '@assets/logo/logo-main.svg';

export type TravlocksWordmarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  alt?: string;
  /** 미지정 시 `logo-main.svg` */
  src?: string;
};

export function TravlocksWordmark({ className, alt = 'Travlocks', src, ...props }: TravlocksWordmarkProps) {
  return (
    <img
      src={src ?? logoMainUrl}
      alt={alt}
      draggable={false}
      className={clsx('block object-contain object-left', className)}
      {...props}
    />
  );
}
