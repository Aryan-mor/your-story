import { Select as NextUiSelect, type SelectProps } from '@heroui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Select = forwardRef<HTMLSelectElement | null, SelectProps>(
  (
    { variant = 'bordered', radius = 'lg', children, classNames, ...props },
    ref,
  ) => {
    return (
      <NextUiSelect
        ref={ref}
        {...props}
        variant={variant}
        radius={radius}
        labelPlacement="outside"
        classNames={{
          ...classNames,
          trigger: twMerge('shadow-none', classNames?.trigger),
          value: twMerge('text-gray-900 font-normal', classNames?.value),
          description: twMerge('text-gray-900', classNames?.description),
        }}
      >
        {children}
      </NextUiSelect>
    );
  },
);

export default Select;
