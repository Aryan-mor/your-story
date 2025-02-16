import {
  AvatarGroup as NextUiAvatarGroup,
  type AvatarGroupProps as NextUiAvatarGroupProps,
} from '@heroui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Avatar, { type AvatarProps } from './avatar.tsx';

type AvatarGroupProps = { size: AvatarProps['size'] } & Omit<
  NextUiAvatarGroupProps,
  'size'
>;

export default function AvatarGroup({
  classNames,
  size,
  isGrid = true,
  onClick,
  ...props
}: AvatarGroupProps) {
  return (
    <NextUiAvatarGroup
      isGrid={isGrid}
      renderCount={(count) => (
        <Avatar
          classNames={{
            base: clsx({
              'cursor-pointer': !!onClick,
            }),
          }}
          size={size}
          fallback={`+${count}`}
        />
      )}
      {...props}
      onClick={onClick}
      classNames={{
        ...classNames,
        base: twMerge(
          clsx({
            'flex flex-wrap gap-1 w-full justify-start': isGrid,
          }),
          classNames?.base,
        ),
      }}
    />
  );
}
