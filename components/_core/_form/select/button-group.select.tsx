import { ButtonGroup, type ButtonGroupProps } from '@heroui/react';
import { tw } from '../../../../utils/tw.ts';
import Button, { type ButtonProps } from '../../button/button';

type ButtonGroupItem = { id: number | string } & Omit<ButtonProps, 'variant'>;
type ButtonGroupSelectProps = {
  items: ButtonGroupItem[];
  activeItem: ButtonGroupItem['id'];
  activeButtonProps?: undefined | ButtonProps;
  buttonProps?: undefined | ButtonProps;
  deactivateButtonProps?: undefined | ButtonProps;
  onActiveChange: (id: ButtonGroupItem['id']) => void;
} & ButtonGroupProps;
export default function ButtonGroupSelect({
  items,
  activeItem,
  activeButtonProps = {},
  deactivateButtonProps = {},
  buttonProps = {},
  onActiveChange,
  ...props
}: ButtonGroupSelectProps) {
  return (
    <ButtonGroup {...props}>
      {items.map(({ id, ...button }) => {
        const isActive = activeItem === id;
        return (
          <Button
            key={id}
            onPress={() => onActiveChange(id)}
            radius="lg"
            disableAnimation={isActive}
            variant={isActive ? 'bordered' : 'flat'}
            {...buttonProps}
            {...(isActive ? activeButtonProps : deactivateButtonProps)}
            {...button}
            className={tw(
              {
                'cursor-default': isActive,
              },
              buttonProps?.className,
              (isActive ? activeButtonProps : deactivateButtonProps)?.className,
              button?.className,
            )}
          />
        );
      })}
    </ButtonGroup>
  );
}
