import {
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps,
} from '@heroui/react';
import clsx from 'clsx';
import { cloneElement, type ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import Card from '../card';

export type CardItemProps = {
  cardProps?: undefined | Omit<CardProps, 'onClick' | 'onPress'>;
  header?: undefined | ReactElement;
  leftTop?: undefined | ReactElement;
  leftBottom?: undefined | ReactElement;
  leftCenter?: undefined | ReactElement;
  rightCenter?: undefined | ReactElement;
  rightTop?: undefined | ReactElement;
  rightBottom?: undefined | ReactElement;
  footer?: undefined | ReactElement;
  startBodySuffix?: undefined | ReactElement;
  endBodySuffix?: undefined | ReactElement;
  classNames?:
    | undefined
    | {
        base?: string;
        body?: string;
        itemsBody?: string;
        footer?: string;
      };
  onClick?: undefined | (() => void);
};

const renderCardElement = (element: ReactElement | undefined) => {
  const safeElement = element ?? <div />;
  return cloneElement(safeElement, {
    className: twMerge('col-span-6', safeElement.props.className),
  });
};

export default function CardItem({
  cardProps,
  header,
  leftTop,
  rightTop,
  leftCenter,
  rightCenter,
  leftBottom,
  rightBottom,
  footer,
  startBodySuffix,
  endBodySuffix,
  classNames,
  onClick,
}: CardItemProps) {
  return (
    <Card
      {...cardProps}
      className={twMerge(
        'w-full border',
        clsx({
          'cursor-pointer': onClick !== undefined,
        }),
        cardProps?.classNames?.base,
        classNames?.base,
      )}
      radius="xl"
      shadow="none"
      isPressable={onClick !== undefined}
      onPress={onClick ?? (() => {})}
    >
      {header && (
        <CardHeader className="grid grid-cols-2 gap-3">{header}</CardHeader>
      )}
      {(leftTop ||
        rightTop ||
        leftCenter ||
        rightCenter ||
        leftBottom ||
        rightBottom) && (
        <CardBody
          className={twMerge('flex gap-aos-g-xl p-0', classNames?.body)}
        >
          {startBodySuffix}
          <div
            className={twMerge(
              'grid w-full grid-cols-12 gap-aos-g-2xl',
              classNames?.itemsBody,
            )}
          >
            {(leftTop || rightTop) && (
              <>
                {renderCardElement(leftTop)}
                {renderCardElement(rightTop)}
              </>
            )}
            {(leftCenter || rightCenter) && (
              <>
                {renderCardElement(leftCenter)}
                {renderCardElement(rightCenter)}
              </>
            )}
            {(leftBottom || rightBottom) && (
              <>
                {renderCardElement(leftBottom)}
                {renderCardElement(rightBottom)}
              </>
            )}
          </div>
          {endBodySuffix}
        </CardBody>
      )}
      {footer && (
        <CardFooter className={twMerge('p-0', classNames?.footer)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
