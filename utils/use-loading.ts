import { useOpen } from './use-open';

export default function useLoading(initialValue = false) {
  const {
    isOpen: isLoading,
    onOpen: onLoadingStart,
    onClose: onLoadingFinished,
  } = useOpen(initialValue);
  return {
    isLoading,
    onLoadingStart,
    onLoadingFinished,
  };
}
