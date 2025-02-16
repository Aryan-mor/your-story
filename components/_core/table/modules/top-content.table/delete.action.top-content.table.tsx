import { type TFunction } from 'i18next';
import { Trash } from 'lucide-react';
import type { ButtonProps, ButtonPropsWithKey } from '../../../button/button.tsx';

export default function DeleteActionTopContentTable({
  count,
  t,
  key,
  ...props
}: { t: TFunction; count: number } & ButtonProps): ButtonPropsWithKey {
  return {
    startContent: <Trash size={18} />,
    variant: 'flat',
    color: 'danger',
    children: t('Delete {{count}} items', {
      count: count,
    }),
    ...props,
    key: key ?? 'delete',
  };
}
