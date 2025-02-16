import type { FC } from 'react';
import { Fragment } from 'react/jsx-runtime';
import type { ModalProps } from './modal.tsx';

export default function LazyModal<
  T extends ModalProps<OnCloseProps>,
  OnCloseProps = unknown,
>(Modal: FC<T>) {
  return function LazyModalWrapper(props: T) {
    return props.isOpen ? <Modal {...props} /> : <Fragment />;
  };
}
