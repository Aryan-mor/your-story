import {
  Avatar as NextUiAvatar,
  type AvatarProps as NextUiAvatarProps,
  Badge,
  type BadgeProps,
} from '@heroui/react';
import clsx from 'clsx';
import { tw } from '@/utils/tw';

type AvatarExtraSize = 'xs' | 'xl' | '2xl' | '3xl';

type AvatarSize =
  | Exclude<NextUiAvatarProps['size'], undefined>
  | AvatarExtraSize;

export const avatarSizeProps: Record<
  AvatarSize,
  {
    size?: NextUiAvatarProps['size'];
    classNames: { label?: string } & NextUiAvatarProps['classNames'];
  }
> = {
  'xs': {
    classNames: {
      base: 'min-w-5 min-h-5 w-5 h-5',
      label: 'text-[0.6rem]',
    },
  },
  'sm': {
    size: 'sm',
    classNames: {
      base: 'min-w-8 min-h-8 w-8 h-8',
      label: 'text-xs',
    },
  },
  'md': {
    size: 'md',
    classNames: {
      base: 'min-w-10 min-h-10 w-10 h-10',
      label: 'text-base',
    },
  },
  'lg': {
    size: 'lg',
    classNames: {
      base: 'min-w-12 min-h-12 w-12 h-12',
      label: 'text-base',
    },
  },
  'xl': {
    classNames: {
      base: 'min-w-14 min-h-14 w-14 h-14',
      label: 'text-lg',
    },
  },
  '2xl': {
    classNames: {
      base: 'min-w-16 min-h-16 w-16 h-16',
      label: 'text-lg',
    },
  },
  '3xl': {
    classNames: {
      base: 'min-w-16 min-h-16 w-16 h-16 xl:h-20 xl:min-w-20',
      label: 'text-lg xl:text-xl',
    },
  },
};

export type AvatarProps = {
  size?: undefined | AvatarSize;
  badgeProps?: undefined | Omit<BadgeProps, 'children'>;
} & Omit<NextUiAvatarProps, 'size'>;

const labelClassName = 'text-[#ffffff] font-light whitespace-nowrap';

export default function Avatar({
  size = 'md',
  classNames,
  onClick,
  badgeProps,
  name,
  title,
  ...props
}: AvatarProps) {
  const sizeProp = avatarSizeProps[size];
  const avatar = (
    <NextUiAvatar
      size={sizeProp?.size}
      onClick={onClick}
      name={name ?? ''}
      title={title ?? name ?? ''}
      {...props}
      classNames={{
        base: tw(
          'bg-gray-400',
          sizeProp?.classNames?.base,
          clsx({
            'cursor-pointer': !!onClick,
          }),
          classNames?.base,
        ),
        name: tw(
          labelClassName,
          sizeProp?.classNames?.label,
          sizeProp?.classNames?.name,
          classNames?.name,
        ),
        fallback: tw(
          labelClassName,
          '[&>svg]:text-aos-co-secondary',
          sizeProp?.classNames?.label,
          sizeProp?.classNames?.fallback,
          classNames?.fallback,
        ),
        icon: tw('text-white', sizeProp?.classNames?.icon, classNames?.icon),
        img: tw('opacity-100', sizeProp?.classNames?.img, classNames?.img),
      }}
    />
  );

  if (!badgeProps) return avatar;
  return <Badge {...badgeProps}>{avatar}</Badge>;
}
