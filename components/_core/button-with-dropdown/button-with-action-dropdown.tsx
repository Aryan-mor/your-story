import { ButtonGroup, Divider, type DividerProps } from '@heroui/react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import Button, { type ButtonProps } from '../button/button';
import ActionDropdown, {
  type ActionDropdownProps,
} from '../dropdown/action.dropdown';

type ButtonWithActionDropdownProps<KEYS extends string> = {
  dropDownProps?: undefined | ActionDropdownProps<KEYS>;
  buttonProps: ButtonProps;
  dividerProps?: undefined | DividerProps;
};

export default function ButtonWithActionDropdown<KEYS extends string>({
  dropDownProps,
  buttonProps,
  dividerProps,
}: ButtonWithActionDropdownProps<KEYS>) {
  return (
    <ButtonGroup variant="flat">
      <Button {...buttonProps}>{buttonProps.children}</Button>
      {dividerProps && (
        <Divider
          orientation="vertical"
          {...dividerProps}
          className={clsx(
            {
              'bg-aos-co-action-primary-onLight':
                buttonProps.variant === 'solid' &&
                buttonProps.color === 'primary',
            },
            dividerProps.className,
          )}
        />
      )}
      {dropDownProps && (
        <ActionDropdown
          actionButtonProps={{
            children: <ChevronDown />,
          }}
          placement="bottom-end"
          {...dropDownProps}
        />
      )}
    </ButtonGroup>
  );
}
