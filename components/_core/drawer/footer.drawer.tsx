import {
  DrawerFooter as NextUiDrawerFooter,
  type DrawerFooterProps as NextUiDrawerFooterProps,
} from '@heroui/react';
import { tw } from '../../../utils/tw.ts';
import {
  useModalFooterActions,
  type UseModalFooterActionsProps,
} from '../modal/footer.modal';

export type DrawerFooterProps = {
  classNames?:
    | undefined
    | {
        base?: undefined | string;
      };
} & Omit<NextUiDrawerFooterProps, 'children'> &
  UseModalFooterActionsProps;

export default function DrawerFooter({
  primaryAction,
  secondaryAction,
  leftAction,
  classNames,
  closeButtonAction,
  onClose,
  ...props
}: DrawerFooterProps) {
  const modalFooterActionsRender = useModalFooterActions({
    onClose,
    secondaryAction,
    leftAction,
    closeButtonAction,
    primaryAction,
  });

  return (
    <NextUiDrawerFooter
      className={tw('flex justify-between', classNames?.base)}
      {...props}
    >
      {modalFooterActionsRender}
    </NextUiDrawerFooter>
  );
}
