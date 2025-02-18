import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import type { UseModalFooterActionsProps } from '../footer.modal';
import LazyModal from '../lazy.modal';
import Modal, { type ModalProps } from '../modal';

export type ActionModalProps<OnCloseProps = unknown> = {
  message?: undefined | string | ReactNode;
} & ModalProps<OnCloseProps> &
  Pick<
    UseModalFooterActionsProps,
    'primaryAction' | 'secondaryAction' | 'closeButtonAction' | 'leftAction'
  >;

function ActionModal<OnCloseProps = unknown>({
  primaryAction,
  secondaryAction,
  leftAction,
  closeButtonAction,
  onClose,
  message,
  children,
  classNames,
  ...props
}: ActionModalProps<OnCloseProps>) {
  return (
    <Modal
      size="lg"
      {...props}
      onClose={onClose}
      classNames={{
        ...classNames,
        body: twMerge('py-6 min-w-[400px]', classNames?.body),
        footer: twMerge('gap-aos-g-sm', classNames?.footer),
      }}
      footer={{
        primaryAction:
          primaryAction !== undefined
            ? {
                color: 'primary',
                ...primaryAction,
              }
            : undefined,
        secondaryAction,
        leftAction,
        closeButtonAction,
      }}
    >
      {children ?? message}
    </Modal>
  );
}

export default LazyModal(ActionModal);
