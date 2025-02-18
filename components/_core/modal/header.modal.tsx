import { type ModalHeaderProps as NextUiModalHeaderProps } from '@heroui/react';
import type { ReactNode } from 'react';
import { tw } from '../../../utils/tw';
import { type ButtonProps } from '../button/button';
import DrawerHeader from '../drawer/header.drawer';
import type { ModalProps } from './modal';

export type ModalHeaderProps = {
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
} & Omit<NextUiModalHeaderProps, 'children'> &
  Pick<ModalProps, 'isCloseDisabled' | 'onClose'>;

const ModalHeader = (props: ModalHeaderProps) => {
  return (
    <DrawerHeader
      {...props}
      classNames={{
        ...props.classNames,
        base: tw('pr-4', props.classNames?.base),
      }}
    />
  );
};

export default ModalHeader;
