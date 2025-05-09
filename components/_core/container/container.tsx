import clsx from 'clsx';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps = {
  classNames?: { base?: string };
  children: ReactNode | ReactNode[];
  spacingSize?: 'xl' | '3xl';
};
export default function Container({
  spacingSize = '3xl',
  classNames,
  children,
}: ContainerProps) {
  return (
    <div
      className={twMerge(
        clsx('flex w-full flex-col', {
          'px-aos-3xl': spacingSize === '3xl',
          'px-aos-xl': spacingSize === 'xl',
        }),
        classNames?.base,
      )}
    >
      {children}
    </div>
  );
}
