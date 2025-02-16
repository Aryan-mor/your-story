import { Chip } from '@heroui/react';
import type { ChipSlots, SlotsToClasses } from '@nextui-org/theme';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { isString } from 'radash';
import { Fragment, type ReactNode } from 'react';
import { flexCenterStyles } from '../../../../styles/flex';

export const chipActiveItemFilterBaseClassName =
  'cursor-pointer bg-gray-100 py-1 px-1 h-auto';
const chipActiveItemFilterContentHeightClassName = 'h-6';
export const chipActiveItemFilterContentClassName = (
  childrenIsString: boolean,
) =>
  flexCenterStyles(
    'bg-white rounded-md px-2 py-0.5 font-medium',
    chipActiveItemFilterContentHeightClassName,
    {
      'block max-w-40 truncate': childrenIsString,
    },
  );

export default function ChipActiveItemFilter({
  children,
  classNames,
  returnLabel,
  onRemoveClick,
}: {
  children: undefined | string | ReactNode | JSX.Element;
  classNames?: undefined | SlotsToClasses<ChipSlots>;
  returnLabel?: undefined | boolean;
  onRemoveClick?: undefined | (() => void);
}) {
  if (!children) return <Fragment />;
  if (returnLabel) return children;
  return (
    <Chip
      radius="md"
      className="cursor-default select-none font-medium"
      classNames={{
        ...classNames,
        base: clsx('bg-gray-100 py-1 px-1 h-auto', classNames?.base),
        content: clsx(
          chipActiveItemFilterContentClassName(isString(children)),
          classNames?.content,
        ),
      }}
      endContent={
        onRemoveClick && (
          <div
            onClick={onRemoveClick}
            className={flexCenterStyles(
              'ml-1 w-6 cursor-pointer rounded-md bg-white',
              chipActiveItemFilterContentHeightClassName,
            )}
          >
            <X size={18} />
          </div>
        )
      }
    >
      {children}
    </Chip>
  );
}
