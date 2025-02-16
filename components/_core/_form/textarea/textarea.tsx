import {
  Textarea as NextUiTextarea,
  type TextAreaProps as NextUiTextAreaProps,
} from '@heroui/react';
import clsx from 'clsx';
import { forwardRef, Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

type TextAreaProps = {
  valueForCheck?: undefined | string;
} & NextUiTextAreaProps;

const Textarea = forwardRef<HTMLTextAreaElement | null, TextAreaProps>(
  (
    {
      variant = 'bordered',
      radius = 'lg',
      errorMessage,
      placeholder = ' ',
      isInvalid: baseIsInvalid,
      classNames,
      valueForCheck: baseValueForCheck,
      ...props
    },
    ref,
  ) => {
    const valueForCheck = baseValueForCheck ?? props?.value;

    const isInvalid = Boolean(
      (props?.maxLength && valueForCheck && valueForCheck.length > 1000) ||
        baseIsInvalid,
    );

    return (
      <Fragment>
        <NextUiTextarea
          ref={ref}
          {...props}
          variant={variant}
          radius={radius}
          isInvalid={isInvalid}
          errorMessage={errorMessage}
          placeholder={placeholder}
          classNames={{
            ...classNames,
            inputWrapper: twMerge('shadow-none', classNames?.mainWrapper),
          }}
        />
        {props?.maxLength && valueForCheck !== undefined && (
          <span
            className={clsx('mt-1 text-xs text-gray-400', {
              'text-aos-co-action-error-onLight': valueForCheck.length > 1000,
            })}
          >
            {valueForCheck.length}/{props?.maxLength}
          </span>
        )}
      </Fragment>
    );
  },
);

export default Textarea;
