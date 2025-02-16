import {
  DatePicker as NextUIDatePicker,
  type DatePickerProps as NextUiDatePickerProps,
} from '@heroui/react';
import { CircleX } from 'lucide-react';
import { forwardRef, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import Button from '../../button/button.tsx';

type DatePickerProps = NextUiDatePickerProps & {
  showOptionLabel?: boolean;
  onClearPress?: undefined | (() => void);
};

const DatePicker = forwardRef<HTMLInputElement | null, DatePickerProps>(
  (
    {
      variant = 'bordered',
      radius = 'lg',
      classNames,
      label,
      labelPlacement = 'outside',
      showOptionLabel = false,
      onClearPress,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();

    return (
      <NextUIDatePicker
        ref={ref}
        {...props}
        label={
          <Fragment>
            {label}
            {showOptionLabel && (
              <span className="pl-1 text-aos-co-tertiary group-data-[invalid]:text-danger group-data-[invalid]:opacity-70">
                ({t('Optional')})
              </span>
            )}
          </Fragment>
        }
        variant={variant}
        radius={radius}
        labelPlacement={labelPlacement}
        selectorButtonPlacement="start"
        endContent={
          !props.isRequired && props.value && onClearPress ? (
            <Button
              className="-mx-2"
              isIconOnly
              size="sm"
              radius="full"
              variant="light"
              onPress={onClearPress}
            >
              <CircleX size={18} className="text-inherit" />
            </Button>
          ) : undefined
        }
        classNames={{
          ...classNames,
          base: 'group',
          inputWrapper: twMerge('shadow-none'),
          label: twMerge('text-sm', classNames?.label),
        }}
      />
    );
  },
);

export default DatePicker;
