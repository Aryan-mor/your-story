import {
  Button as NextUiButton,
  type ButtonProps as NextUiButtonProps,
} from '@heroui/react';
import { forwardRef, type Key } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonColors: Partial<
  Record<
    Exclude<ButtonProps['variant'], undefined>,
    Partial<Record<Exclude<ButtonProps['color'], undefined>, string>>
  >
> = {
  bordered: {
    default: 'text-aos-co-action-neutral-onEmpty',
    success: 'border-green-600 text-green-600',
  },
  solid: {
    default:
      'bg-aos-bg-action-neutral-light-default text-aos-co-action-neutral-onLight',
    warning:
      'bg-aos-bg-action-warning-filled-default text-aos-co-action-warning-onFilled',
    danger:
      'bg-aos-bg-action-error-filled-default text-aos-co-action-error-onFilled',
  },
  flat: {
    default:
      'bg-aos-bg-action-neutral-light-default text-aos-co-action-neutral-onLight',
    primary:
      'bg-aos-bg-action-primary-light-default text-aos-co-action-primary-onLight',
    danger:
      'bg-aos-bg-action-error-light-default !text-aos-co-action-error-onLight',
  },
  light: {
    default: 'text-aos-co-action-neutral-onLight',
  },
};

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
      className: twMerge(
        'text-sm font-semibold',
        buttonColors?.[variant]?.[color],
      ),
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
