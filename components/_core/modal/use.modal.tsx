import { type FC, Fragment, useCallback, useState } from 'react';
import type { HardPartial } from '../../../interfaces/core/hard-partial.ts';
import type { ModalProps } from './modal.tsx';

export default function useModal<T extends ModalProps>(Modal: FC<T>) {
  const [state, setState] = useState<Omit<
    HardPartial<T>,
    'isOpen' | 'onClose' | 'children'
  > | null>(null);

  const handleOpenModal = useCallback(
    (props: null | HardPartial<Omit<T, 'isOpen' | 'onClose' | 'children'>>) => {
      setState(props);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setState(null);
  }, []);

  const safeState = (state ?? {}) as T;
  const isOpen = !!state;

  return {
    renderModal: (
      <Modal {...safeState} isOpen={isOpen} onClose={handleCloseModal}>
        <Fragment />
      </Modal>
    ),
    handleOpenModal,
    isOpen,
  };
}
