import {
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown as NextUiDropdown,
  type DropdownMenuProps,
  type MenuItemProps,
  type DropdownProps as NextUiDropdownProps,
} from '@heroui/react';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type DropdownItemProps<KEYS extends string> = {
  key: KEYS;
  isDisabled?: boolean;
  isIconOnly?: boolean;
} & Omit<MenuItemProps, 'key' | 'isDisabled'>;

export type DropdownProps<KEYS extends string> = {
  items: DropdownItemProps<KEYS>[];
  children: ReactNode;
  onAction: DropdownMenuProps['onAction'];
  dropdownMenuProps?:
    | undefined
    | Omit<
        DropdownMenuProps<DropdownItemProps<KEYS>>,
        'items' | 'children' | 'disabledKeys' | 'onAction'
      >;
  dropdownItemProps?: undefined | MenuItemProps;
} & Omit<NextUiDropdownProps, 'children'>;

export default function Dropdown<KEYS extends string>({
  children,
  items,
  onAction,
  dropdownMenuProps,
  dropdownItemProps,
  classNames,
  ...props
}: DropdownProps<KEYS>) {
  return (
    <NextUiDropdown
      placement="bottom-end"
      {...props}
      classNames={{
        ...classNames,
        content: twMerge('min-w-[130px]', classNames?.content),
      }}
    >
      <DropdownTrigger onClick={(e: any) => e.preventDefault()}>
        {children}
      </DropdownTrigger>
      <DropdownMenu
        {...dropdownMenuProps}
        onAction={onAction ?? (() => {})}
        disabledKeys={
          (items.filter((it) => it.isDisabled && it.key).map((it) => it.key) ??
            []) as string[]
        }
        items={items}
      >
        {(item) => (
          <DropdownItem
            variant="flat"
            {...dropdownItemProps}
            {...item}
            classNames={{
              ...dropdownItemProps?.classNames,
              ...item.classNames,
              title: twMerge(
                clsx({
                  hidden: item.isIconOnly,
                }),
                dropdownItemProps?.classNames?.title,
                item.classNames?.title,
              ),
            }}
            key={item.key}
          >
            {item.children}
          </DropdownItem>
        )}
      </DropdownMenu>
    </NextUiDropdown>
  );
}
