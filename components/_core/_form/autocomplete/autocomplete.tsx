import {
  Autocomplete as NextUiAutocomplete,
  type AutocompleteProps,
} from '@heroui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Autocomplete = forwardRef<HTMLInputElement | null, AutocompleteProps>(
  (
    {
      variant = 'bordered',
      radius = 'lg',
      labelPlacement = 'outside',
      classNames,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <NextUiAutocomplete
        ref={ref}
        {...props}
        variant={variant}
        labelPlacement={labelPlacement}
        radius={radius}
        classNames={{
          ...classNames,
          base: twMerge('!max-w-unset', classNames?.base),
          popoverContent: twMerge('shadow-none', classNames?.popoverContent),
        }}
      >
        {children}
      </NextUiAutocomplete>
    );
  },
);

export default Autocomplete;
