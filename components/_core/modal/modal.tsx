import {
  Divider,
  ModalBody,
  ModalContent,
  type ModalProps as NextUiModalProps,
} from '@heroui/react';
import { Fragment, type ReactNode, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import type { HardPartial } from '../../../interfaces/core/hard-partial.ts';
import { tw } from '../../../utils/tw.ts';
import type { DrawerFooterProps } from '../drawer/footer.drawer.tsx';
import { type DrawerHeaderProps } from '../drawer/header.drawer.tsx';
import BaseModal from './base.modal';
import ModalFooter, { type ModalFooterProps } from './footer.modal.tsx';
import ModalHeader from './header.modal.tsx';

type BaseModalProps = Omit<
  NextUiModalProps,
  'title' | 'children' | 'isOpen' | 'onClose' | 'ref'
>;

export type ModalProps<OnCloseProps = unknown> = {
  isOpen: boolean;
  onClose: (props?: OnCloseProps | undefined) => void;
  title?: undefined | string;
  header?: undefined | Omit<DrawerHeaderProps, 'onClose'>;
  hideHeaderDivider?: undefined | boolean;
  hideFooterDivider?: undefined | boolean;
  isCloseDisabled?: undefined | boolean;
  children?: undefined | ReactNode | ReactNode[];
  footer?: undefined | Omit<ModalFooterProps, 'onClose'>;
  floatFooter?: undefined | ReactNode | ReactNode[];
} & HardPartial<BaseModalProps>;
/**
 don't add
 onClick={(e) => {
 e.stopPropagation();
 e.preventDefault();
 }}
 to BaseModal because will stop all link functionality inside the modal
 **/

export default function Modal<OnCloseProps = unknown | undefined>({
  title,
  header,
  onClose: baseOnClose,
  children,
  hideHeaderDivider,
  hideFooterDivider,
  floatFooter,
  classNames,
  isCloseDisabled,
  footer,
  ...props
}: ModalProps<OnCloseProps>) {
  const onClose = useCallback(() => {
    return (isCloseDisabled ? () => {} : baseOnClose)(undefined);
  }, [baseOnClose, isCloseDisabled]);

  return (
    <BaseModal
      hideCloseButton={true}
      classNames={{
        ...classNames,
        header: tw('font-bold', classNames?.header),
        body: tw(
          'bg-white',
          {
            'rounded-b-lg': !footer,
          },
          classNames?.body,
        ),
        base: tw(
          'overflow-y-visible',
          {
            'transform -translate-y-8': !!floatFooter,
          },
          classNames?.base,
        ),
      }}
      {...(props as BaseModalProps)}
      onOpenChange={onClose}
    >
      <ModalContent>
        {header ? (
          <ModalHeader
            title={title}
            {...header}
            isCloseDisabled={isCloseDisabled}
            onClose={onClose}
          />
        ) : title ? (
          <ModalHeader
            title={title}
            isCloseDisabled={isCloseDisabled}
            onClose={onClose}
          />
        ) : (
          <Fragment />
        )}
        {!hideHeaderDivider && <Divider />}
        <ModalBody>{children}</ModalBody>
        {footer && (
          <>
            {!hideFooterDivider && <Divider />}
            <ModalFooter
              {...(footer as Omit<DrawerFooterProps, 'onClose'>)}
              onClose={onClose}
            />
          </>
        )}
        {floatFooter && (
          <div className={twMerge('absolute top-[calc(100%_+_1rem)] w-full')}>
            {floatFooter}
          </div>
        )}
      </ModalContent>
    </BaseModal>
  );
}
