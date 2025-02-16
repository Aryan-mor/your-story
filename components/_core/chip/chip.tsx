import {
  Chip as NextUiChip,
  type ChipProps as NextUiChipProps,
} from '@heroui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type ChipProps = {
  color?: undefined | 'orange' | NextUiChipProps['color'];
} & Omit<NextUiChipProps, 'color'>;

const overrideColor: Partial<
  Record<
    Exclude<ChipProps['variant'], undefined>,
    Partial<Record<Exclude<ChipProps['color'], undefined>, string>>
  >
> = {
  bordered: {
    default: 'border-aos-br-interaction-neutral-default',
  },
  solid: {
    default: 'bg-aos-bg-accent-gray-subtle',
    orange: 'bg-aos-bg-accent-orange-subtle text-aos-co-accent-orange-primary',
    danger: 'bg-aos-bg-accent-red-subtle text-aos-co-accent-red-primary',
  },
};

const Chip = forwardRef<HTMLDivElement | null, ChipProps>(
  (
    { variant = 'solid', color = 'default', classNames, ...props }: ChipProps,
    ref,
  ) => {
    return (
      <NextUiChip
        ref={ref}
        radius="md"
        variant={variant}
        {...props}
        classNames={{
          ...classNames,
          base: clsx(
            'px-aos-2xs gap-aos-xs',
            overrideColor?.[variant]?.[color],
            classNames?.base,
          ),
          content: twMerge(
            'px-0 max-w-[120px] truncate font-semibold',
            classNames?.content,
          ),
        }}
      />
    );
  },
);

export default Chip;
