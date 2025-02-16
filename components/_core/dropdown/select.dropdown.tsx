import { Checkbox, type DropdownMenuProps } from '@heroui/react';
import { useCallback } from 'react';
import Dropdown, {
  type DropdownItemProps,
  type DropdownProps,
} from './dropdown.tsx';

export type SelectDropdownProps<KEYS extends string> = {
  selectedKeys: KEYS[];
  onSelectionChange: (newSelectedKeys: KEYS[]) => void;
} & DropdownProps<KEYS>;

export default function SelectDropdown<KEYS extends string>({
  selectedKeys,
  onSelectionChange,
  ...props
}: SelectDropdownProps<KEYS>) {
  const handleSelectionChange = useCallback<
    Exclude<
      DropdownMenuProps<DropdownItemProps<KEYS>>['onSelectionChange'],
      undefined
    >
  >(
    (keys) => {
      onSelectionChange(Array.from(keys as Set<KEYS>));
    },
    [onSelectionChange],
  );
  return (
    <Dropdown
      {...props}
      items={props.items.map((it) => ({
        ...it,
        startContent: <Checkbox isSelected={selectedKeys.includes(it.key)} />,
      }))}
      dropdownMenuProps={{
        selectionMode: 'multiple',
        closeOnSelect: false,
        hideSelectedIcon: true,
        ...props?.dropdownMenuProps,
        selectedKeys,
        onSelectionChange: handleSelectionChange,
      }}
    />
  );
}
