import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { EllipsisVertical } from 'lucide-react';
import Button from '../../button/button.tsx';
import type { DropdownItemProps } from '../../dropdown/dropdown.tsx';

type TableActionItem<KEYS extends string> = DropdownItemProps<KEYS> & {
  key: string;
};
type TableActionsProps<KEYS extends string> = {
  items: TableActionItem<KEYS>[];
};

export default function TableActions<KEYS extends string>({
  items,
}: TableActionsProps<KEYS>) {
  return (
    <Dropdown
      classNames={{
        content: 'min-w-[100px]',
      }}
    >
      <DropdownTrigger>
        <Button color="default" variant="light" size="sm" isIconOnly>
          <EllipsisVertical
            size={18}
            className="text-aos-co-action-neutral-onEmpty"
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {items.map(({ key, children, startContent, onPress }) => (
          <DropdownItem
            key={key}
            startContent={startContent}
            {...(onPress ? { onPress } : {})}
          >
            {children}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
