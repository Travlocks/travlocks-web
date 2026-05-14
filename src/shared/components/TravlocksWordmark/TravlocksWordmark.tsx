import clsx from 'clsx';
import type { ImgHTMLAttributes } from 'react';

import logoMainUrl from '@assets/logo/logo-main.svg';

export type TravlocksWordmarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  alt?: string;
};

export function TravlocksWordmark({ className, alt = 'Travlocks', ...props }: TravlocksWordmarkProps) {
  return (
    <img
      src={logoMainUrl}
      alt={alt}
      draggable={false}
      className={clsx('block max-h-full w-auto max-w-full object-contain object-left', className)}
      {...props}
    />
  );
}
