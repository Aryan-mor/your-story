import clsx from 'clsx';
import { isString } from 'radash';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import CArray from '../../../utils/cArray.ts';
import { tw } from '../../../utils/tw.ts';
import NoResult from '../../no-result.tsx';
import Drawer, { type DrawerProps } from './drawer.tsx';

export type ListDrawerProps<ITEM> = {
  list: undefined | ITEM[];
  renderItem: (item: ITEM) => ReactNode;
  resultSuffix?: undefined | ReactNode;
  classNames?: {
    root?: string;
    content?: string;
    results?: string;
  };
  noResultMessage?: string | ReactNode | undefined;
  isLoading?: boolean | undefined;
  underListSuffix?: undefined | ReactNode;
} & DrawerProps;

export default function ListDrawer<ITEM>({
  isOpen,
  list,
  renderItem,
  onClose,
  classNames,
  children,
  resultSuffix,
  noResultMessage,
  isLoading,
  underListSuffix,
  ...props
}: ListDrawerProps<ITEM>) {
  const { t } = useTranslation();
  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props}>
      <div className={twMerge('flex flex-col gap-2', classNames?.content)}>
        {children}
        <div className={clsx('flex flex-col')}>
          <div
            className={tw(
              'mb-3 text-sm text-gray-600',
              {
                hidden: CArray.isEmpty(list) && isLoading,
              },
              classNames?.results,
            )}>
            {list?.length ?? 0} {t('Results')} {resultSuffix}
          </div>
          <div className="flex flex-wrap space-y-3">
            {list?.map((item) => renderItem(item))}
          </div>
          {!isLoading &&
            CArray.isArray(list) &&
            CArray.isEmpty(list) &&
            (isString(noResultMessage) ? (
              <NoResult
                description={
                  noResultMessage ??
                  t('Sorry, that filter combination has no results.')
                }
              />
            ) : (
              noResultMessage
            ))}
        </div>
        {underListSuffix}
      </div>
    </Drawer>
  );
}
