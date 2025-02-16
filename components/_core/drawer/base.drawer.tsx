import { Drawer as NextUiDrawer, type DrawerProps } from '@heroui/react';
import { twMerge } from 'tailwind-merge';
import { drawerHeaderSizeProps } from './config.drawer';

export type HeaderSize = 'sm' | 'md' | 'lg';

export type BaseDrawerProps = {
  headerSize?: HeaderSize;
  isCloseDisabled?: boolean | undefined;
} & DrawerProps;

export default function BaseDrawer({
  classNames,
  headerSize = 'md',
  isCloseDisabled,
  onClose: baseOnClose,
  ...props
}: BaseDrawerProps) {
  const onClose = isCloseDisabled ? () => {} : baseOnClose;

  return (
    <NextUiDrawer
      shouldBlockScroll={true}
      {...props}
      onClose={onClose ?? (() => {})}
      classNames={{
        ...classNames,
        header: twMerge(
          'flex items-center',
          drawerHeaderSizeProps[headerSize].classNames?.header,
          classNames?.header,
        ),
        body: twMerge(classNames?.body),
        closeButton: twMerge(
          drawerHeaderSizeProps[headerSize].classNames?.closeButton,
          classNames?.closeButton,
        ),
      }}
    />
  );
}
