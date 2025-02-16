import {
  DrawerHeader as NextUiDrawerHeader,
  type DrawerHeaderProps as NextUiDrawerHeaderProps,
} from '@heroui/react';
import { Pencil, X } from 'lucide-react';
import { isString } from 'radash';
import type { ReactNode } from 'react';
import { tw } from '../../../utils/tw.ts';
import Button, { type ButtonProps } from '../button/button.tsx';
import type { DrawerProps } from './drawer.tsx';

export type DrawerHeaderProps = {
  titleStartContent?: ReactNode | undefined;
  titleEndContent?: ReactNode | string | undefined;
  primaryAction?: ButtonProps | undefined;
  title?: undefined | string;
  onTitlePress?: undefined | (() => void);
  titleAction?: undefined | ButtonProps;
  classNames?:
    | undefined
    | {
        base?: undefined | string;
        titleWrapper?: undefined | string;
        title?: undefined | string;
        titleEndContent?: undefined | string;
      };
} & Omit<NextUiDrawerHeaderProps, 'children'> &
  Pick<DrawerProps, 'isCloseDisabled' | 'onClose'>;

export default function DrawerHeader({
  titleStartContent,
  titleEndContent,
  title,
  titleAction,
  className,
  onTitlePress,
  classNames,
  primaryAction,
  onClose,
  isCloseDisabled,
  ...props
}: DrawerHeaderProps) {
  return (
    <NextUiDrawerHeader
      {...props}
      className={tw('justify-between pr-8', className, classNames?.base)}
    >
      <div
        className={tw(
          'flex items-center gap-aos-g-md text-xl font-bold',
          classNames?.titleWrapper,
        )}
      >
        {titleStartContent}
        <span
          onClick={onTitlePress}
          className={tw(
            'max-w-[250px] truncate',
            {
              'cursor-pointer': !!onTitlePress,
            },
            classNames?.title,
          )}
        >
          {title}
        </span>
        {isString(titleEndContent) ? (
          <span className={tw('-ml-1 text-base', classNames?.titleEndContent)}>
            {titleEndContent}
          </span>
        ) : (
          titleEndContent
        )}
        {titleAction?.onPress && (
          <Button variant="light" size="sm" isIconOnly={true} {...titleAction}>
            {titleAction?.children ?? <Pencil size={18} />}
          </Button>
        )}
      </div>
      <div className="flex gap-aos-g-sm">
        {primaryAction && <Button {...primaryAction} />}
        <Button
          isIconOnly={true}
          variant="light"
          isDisabled={isCloseDisabled}
          onPress={onClose}
        >
          <X />
        </Button>
      </div>
    </NextUiDrawerHeader>
  );
}
