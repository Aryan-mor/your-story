import { Switch as NextUiSwitch, type SwitchProps } from '@heroui/react';
import { forwardRef } from 'react';

const Switch = forwardRef<HTMLInputElement | null, SwitchProps>(
  (props, ref) => {
    return <NextUiSwitch ref={ref} {...props} />;
  },
);

export default Switch;
