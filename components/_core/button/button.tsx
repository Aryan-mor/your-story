import {
  Button as NextUiButton,
  type ButtonProps as NextUiButtonProps,
} from '@heroui/react';
import { forwardRef, type Key } from 'react';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = Omit<NextUiButtonProps, 'onClick'>;
export type ButtonPropsWithKey = Omit<ButtonProps, 'key'> & { key: Key };

const Button = forwardRef<HTMLButtonElement | null, ButtonProps>(
  (
    {
      className,
      variant = 'bordered',
      color = 'default',
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const defaultButtonProps: ButtonProps = {
      radius: 'lg',
      className: twMerge('text-sm font-semibold'),
    };

    return (
      <NextUiButton
        ref={ref}
        variant={variant}
        color={color}
        {...defaultButtonProps}
        {...props}
        className={twMerge(defaultButtonProps.className, className)}
      />
    );
  },
);

export default Button;
