import { useCallback, useState } from 'react';

export const useOpen = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onReverse = useCallback(() => setIsOpen((s) => !s), [setIsOpen]);
  return { isOpen, setIsOpen, onOpen, onClose, onReverse };
};
