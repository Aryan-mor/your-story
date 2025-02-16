import { Divider, DrawerContent, ModalBody } from '@heroui/react';
import { Fragment, type ReactNode } from 'react';
import { tw } from '../../../utils/tw.ts';
import BaseDrawer, { type BaseDrawerProps } from './base.drawer.tsx';
import DrawerFooter, { type DrawerFooterProps } from './footer.drawer.tsx';
import DrawerHeader, { type DrawerHeaderProps } from './header.drawer.tsx';

export type DrawerProps = {
  title?: undefined | string;
  header?: undefined | Omit<DrawerHeaderProps, 'onClose'>;
  footer?: undefined | Omit<DrawerFooterProps, 'onClose'>;
  isOpen: boolean;
  hideHeaderDivider?: boolean;
  hideFooterDivider?: boolean;
  startChildren?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  onClose: () => void;
} & Omit<BaseDrawerProps, 'title' | 'children' | 'isOpen' | 'onClose'>;

export const drawerBodyPx = 'p-aos-3xl';
export const drawerBodyGap = 'gap-aos-g-lg';
export default function Drawer({
  title,
  header,
  hideHeaderDivider,
  hideFooterDivider,
  startChildren,
  footer,
  children,
  classNames,
  isCloseDisabled,
  onClose: baseOnClose,
  ...props
}: DrawerProps) {
  const onClose = isCloseDisabled ? () => {} : baseOnClose;

  return (
    <BaseDrawer
      hideCloseButton={Boolean(title || header)}
      isCloseDisabled={isCloseDisabled}
      onClose={onClose}
      {...props}
      classNames={{
        ...classNames,
        body: tw('p-0', drawerBodyGap, drawerBodyPx, classNames?.body), //I add p-0 to pass library padding
      }}
    >
      <DrawerContent>
        {header ? (
          <DrawerHeader
            title={title}
            {...header}
            isCloseDisabled={isCloseDisabled}
            onClose={onClose}
          />
        ) : title ? (
          <DrawerHeader
            title={title}
            isCloseDisabled={isCloseDisabled}
            onClose={onClose}
          />
        ) : (
          <Fragment />
        )}
        {!hideHeaderDivider && <Divider />}
        {startChildren}
        <ModalBody>{children}</ModalBody>
        {footer !== undefined && (
          <>
            {!hideFooterDivider && <Divider />}
            <DrawerFooter {...footer} onClose={onClose} />
          </>
        )}
      </DrawerContent>
    </BaseDrawer>
  );
}
