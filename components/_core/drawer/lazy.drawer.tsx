import type { FC } from 'react';
import { Fragment } from 'react/jsx-runtime';

type LazyModalProps = {
  isOpen: boolean;
} & Record<string, any>;

export default function LazyDrawer(Drawer: FC<any>) {
  return function LazyDrawerWrapper(props: LazyModalProps) {
    return props.isOpen ? <Drawer {...props} /> : <Fragment />;
  };
}
