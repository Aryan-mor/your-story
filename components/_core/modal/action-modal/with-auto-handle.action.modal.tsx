import { cloneElement, Fragment, type JSX } from 'react';
import { useOpen } from '../../../../utils/use-open';
import type { UseModalFooterActionsProps } from '../footer.modal';
import ActionModal, { type ActionModalProps } from './action.modal';

export type WithAutoHandleActionModalProps = {
  children: JSX.Element;
  skipConfirmation?: undefined | boolean;
  closeButtonAction?:
    | undefined
    | UseModalFooterActionsProps['closeButtonAction'];
} & Omit<ActionModalProps, 'isOpen' | 'onClose' | 'closeButtonAction'>;
export default function WithAutoHandleActionModal({
  children,
  skipConfirmation,
  primaryAction,
  closeButtonAction,
  ...props
}: WithAutoHandleActionModalProps) {
  const { isOpen, onOpen, onClose } = useOpen();
  return (
    <Fragment>
      {cloneElement(children, {
        onClick: skipConfirmation ? primaryAction?.onPress : onOpen,
      })}
      <ActionModal
        isOpen={isOpen}
        onClose={onClose}
        {...props}
        primaryAction={{
          ...primaryAction,
          onPress: (e) => {
            primaryAction?.onPress?.(e);
            onClose();
          },
        }}
        closeButtonAction={{
          onPress: onClose,
          ...closeButtonAction,
        }}
      />
    </Fragment>
  );
}
