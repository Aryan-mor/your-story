import { type FC, Fragment, useCallback, useState } from 'react';
import type { DrawerProps } from './drawer';
import { HardPartial } from '@/utils/hard-partial';

export default function useDrawer<T extends DrawerProps>(Drawer: FC<T>) {
  const [state, setState] = useState<Omit<
    HardPartial<T>,
    'isOpen' | 'onClose' | 'children'
  > | null>(null);

  const handleOpenDrawer = useCallback(
    (props: null | HardPartial<Omit<T, 'isOpen' | 'onClose' | 'children'>>) => {
      setState(props);
    },
    [],
  );

  const handleCloseDrawer = useCallback(() => {
    setState(null);
  }, []);

  const safeState = (state ?? {}) as T;
  const isOpen = !!state;

  return {
    renderDrawer: (
      <Drawer {...safeState} isOpen={isOpen} onClose={handleCloseDrawer}>
        <Fragment />
      </Drawer>
    ),
    handleOpenDrawer,
    isOpen,
  };
}
