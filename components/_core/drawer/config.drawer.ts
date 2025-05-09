import type { BaseDrawerProps, HeaderSize } from './base.drawer';

export const drawerHeaderMinHeight: Record<
  HeaderSize,
  {
    size: number;
    className: string;
  }
> = {
  sm: {
    size: 56,
    className: 'min-h-[56px]',
  },
  md: {
    size: 72,
    className: 'min-h-[72px]',
  },
  lg: {
    size: 80,
    className: 'min-h-[80px]',
  },
};

export const drawerHeaderSizeProps: Record<
  HeaderSize,
  { classNames: BaseDrawerProps['classNames'] }
> = {
  sm: {
    classNames: {
      header: drawerHeaderMinHeight['sm'].className,
    },
  },
  md: {
    classNames: {
      header: drawerHeaderMinHeight['md'].className,
    },
  },
  lg: {
    classNames: {
      header: drawerHeaderMinHeight['lg'].className,
    },
  },
};
