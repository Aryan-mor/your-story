import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Chip, { type ChipProps } from '../chip/chip';

export type TitleProps = {
  children: ReactNode;
  chipProps?: ChipProps;
  suffix?: undefined | ReactNode;
  classNames?: {
    base?: string;
    label?: string;
  };
};

export default function Title({
  children,
  classNames,
  chipProps,
  suffix,
}: TitleProps) {
  return (
    <div className={twMerge('flex gap-aos-g-lg pb-aos-sm', classNames?.base)}>
      <span
        className={twMerge(
          'text-base font-semibold text-aos-co-primary',
          classNames?.label,
        )}
      >
        {children}
      </span>
      {chipProps && (
        <Chip size="lg" {...chipProps}>
          {chipProps?.children}
        </Chip>
      )}
      {suffix}
    </div>
  );
}
