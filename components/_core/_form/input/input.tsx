import {
  Input as NextUiInput,
  type InputProps as NextUiInputProps,
} from '@heroui/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type InputProps = {
  placeholder?: undefined | string;
} & Omit<NextUiInputProps, 'placeholder'>;

export const inputColors: Partial<
  Record<
    Exclude<InputProps['variant'], undefined>,
    Partial<Record<Exclude<InputProps['color'], undefined>, string>>
  >
> = {
  bordered: {
    default: 'border-default',
  },
};

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      variant = 'bordered',
      radius = 'lg',
      placeholder = ' ',
      classNames,
      color = 'default',
      labelPlacement = 'outside',
      ...props
    },
    ref,
  ) => {
    const defaultInputProps: InputProps = {
      radius: 'lg',
      className: twMerge(
        'text-sm font-semibold',
        inputColors?.[variant]?.[color],
      ),
    };
    return (
      <NextUiInput
        ref={ref}
        {...defaultInputProps}
        {...props}
        variant={variant}
        radius={radius}
        placeholder={placeholder ?? ' '}
        labelPlacement={labelPlacement}
        classNames={{
          ...classNames,
          inputWrapper: twMerge(
            'shadow-none',
            defaultInputProps?.classNames?.inputWrapper,
            classNames?.inputWrapper,
          ),
          label: twMerge(
            'text-sm',
            defaultInputProps?.classNames?.label,
            classNames?.label,
          ),
        }}
      />
    );
  },
);

export default Input;
