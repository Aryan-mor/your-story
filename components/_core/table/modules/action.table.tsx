import { tw } from '../../../../utils/tw.ts';
import Button, { type ButtonProps } from '../../button/button';

export default function ActionTable({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      isIconOnly={true}
      variant="light"
      className={tw(className)}
      {...props}
    />
  );
}
