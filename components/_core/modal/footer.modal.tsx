import { tw } from '@/utils/tw';
import {
  ModalFooter as NextUiModalFooter,
  type ModalFooterProps as NextUiModalFooterProps,
} from '@heroui/react';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../button/button';

export type ModalFooterProps = {
  classNames?:
    | undefined
    | {
        base?: undefined | string;
      };
} & UseModalFooterActionsProps &
  Omit<NextUiModalFooterProps, 'children'>;

const ModalFooter = ({
  primaryAction,
  secondaryAction,
  leftAction,
  classNames,
  closeButtonAction,
  onClose,
  ...props
}: ModalFooterProps) => {
  const modalFooterActionsElement = useModalFooterActions({
    onClose,
    closeButtonAction,
    leftAction,
    secondaryAction,
    primaryAction,
  });

  return (
    <NextUiModalFooter
      className={tw('flex justify-between', classNames?.base)}
      {...props}
    >
      {modalFooterActionsElement}
    </NextUiModalFooter>
  );
};
export default ModalFooter;

export type UseModalFooterActionsProps = {
  primaryAction?: ButtonProps | undefined;
  secondaryAction?: ButtonProps | undefined;
  closeButtonAction?: ButtonProps | false | undefined;
  leftAction?: ButtonProps | undefined;
  onClose: () => void;
};

export const useModalFooterActions = ({
  leftAction,
  secondaryAction,
  onClose,
  primaryAction,
  closeButtonAction: baseCloseButtonAction,
}: UseModalFooterActionsProps) => {
  const { t } = useTranslation();
  const buttonList = useMemo<ButtonProps[]>(() => {
    const closeButtonAction: ButtonProps | undefined =
      baseCloseButtonAction === false
        ? undefined
        : {
            key: 'closeButtonAction',
            variant: 'bordered',
            onPress: onClose,
            ...baseCloseButtonAction,
            children: baseCloseButtonAction?.children || t('Close'),
          };
    return [
      primaryAction ? { ...primaryAction, key: 'primaryAction' } : undefined,
      secondaryAction
        ? { ...secondaryAction, key: 'seconderAction' }
        : undefined,
      closeButtonAction,
    ].filter((action) => !!action);
  }, [baseCloseButtonAction, onClose, primaryAction, secondaryAction, t]);

  return (
    <Fragment>
      <div>{leftAction && <Button {...leftAction} />}</div>
      <div className="flex flex-row-reverse gap-2">
        {buttonList.map((action) => (
          <Button key={action.key} {...action} />
        ))}
      </div>
    </Fragment>
  );
};
