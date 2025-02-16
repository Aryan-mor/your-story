import { EllipsisVertical } from 'lucide-react';
import { isEmpty } from 'radash';
import { Fragment } from 'react';
import Button, { type ButtonProps } from '../button/button';
import Dropdown, { type DropdownItemProps, type DropdownProps } from './dropdown';

export type ActionDropdownItem<KEYS extends string = string> = {
  isDisabled?: boolean;
  onActionClick: undefined | (() => void);
} & Omit<DropdownItemProps<KEYS>, 'onClick' | 'isDisabled'>;

export type ActionDropdownProps<KEYS extends string = string> = {
  actionButtonProps?: ButtonProps;
  items: ActionDropdownItem<KEYS>[];
} & Omit<DropdownProps<KEYS>, 'onAction' | 'children' | 'items'>;

export default function ActionDropdown<KEYS extends string = string>({
  actionButtonProps,
  items,
  ...props
}: ActionDropdownProps<KEYS>) {
  if (isEmpty(items)) return <Fragment />;
  return (
    <Dropdown
      items={items}
      disableAnimation
      onAction={(key) => {
        items?.find((item) => item.key === key)?.onActionClick?.();
      }}
      {...props}>
      <Button variant="light" isIconOnly {...actionButtonProps}>
        {actionButtonProps?.children ?? <EllipsisVertical />}
      </Button>
    </Dropdown>
  );
}
