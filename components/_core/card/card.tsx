import {
  Card as NextUiCard,
  type CardProps as NextUiCardProps,
} from '@heroui/react';
import { twMerge } from 'tailwind-merge';

const cardBasePx = 'px-3';
const cardBodyPx = 'px-3';
export const cardBaseBodyPx = 'px-6';

type CardProps = Omit<NextUiCardProps, 'radius'>;

export default function Card({ ...props }: CardProps) {
  return (
    <NextUiCard
      shadow="none"
      {...props}
      onPress={props.onPress ?? (() => {})}
      classNames={{
        ...props.classNames,
        base: twMerge(cardBasePx, props.classNames?.base),
        body: twMerge(cardBodyPx, props.classNames?.body),
      }}
    />
  );
}
