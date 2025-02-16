import { Link, type LinkProps } from '@heroui/react';
import { tw } from '../../../utils/tw.ts';

export type ButtonLinkProps = LinkProps;
export default function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={tw(
        {
          'cursor-pointer': props.onPress || props.href,
        },
        className,
      )}
    />
  );
}
