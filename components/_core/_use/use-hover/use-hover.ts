import { useEffect, useRef } from 'react';
import { useOpen } from '../../../../utils/use-open';

export default function useHover<DOM extends HTMLElement>({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const ref = useRef<DOM | null>(null);
  const { isOpen: isHovered, onOpen: onHoverIn, onClose: onHoverOut } = useOpen();
  useEffect(() => {
    if (!enabled) onHoverOut();
  }, [enabled, onHoverOut]);

  return {
    isHovered,
    hoverProps: {
      ref,
      onMouseEnter: enabled ? onHoverIn : () => {},
      onMouseLeave: enabled ? onHoverOut : () => {},
    },
  };
}
