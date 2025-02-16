import clsx from 'clsx';
import { isArray, isEmpty } from 'radash';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import {
  ModalFromSide,
  modalFromSideChildrenRootPX,
  type ModalFromSideProps,
} from '../../modal/modal-from-side';
import NoResult from '../../no-result';

export type ListModalProps<ITEM> = {
  list: undefined | ITEM[];
  renderItem: (item: ITEM) => ReactNode;
  classNames?: {
    root?: string;
    content?: string;
    results?: string;
  };
  resultSuffix?: undefined | ReactNode;
  children?: undefined | ReactNode | ReactNode[];
} & Pick<
  ModalFromSideProps,
  'isOpen' | 'onClose' | 'title' | 'titleLink' | 'footerActions'
>;

export default function ListModal<ITEM>({
  classNames,
  list,
  renderItem,
  children,
  resultSuffix,
  ...props
}: ListModalProps<ITEM>) {
  const { t } = useTranslation();
  return (
    <ModalFromSide
      className={twMerge('w-screen max-w-3xl', classNames?.root ?? '')}
      childrenRootClassName="pt-0"
      noPaddingBody
      {...props}>
      <div className={twMerge('flex flex-col gap-2', classNames?.content)}>
        {children}
        <div className={clsx('flex flex-col', modalFromSideChildrenRootPX)}>
          <div
            className={twMerge('mb-3 text-sm text-gray-600', classNames?.results)}>
            {list?.length ?? 0} {t('Results')} {resultSuffix}
          </div>
          <div className="flex flex-wrap space-y-3">
            {list?.map((item) => renderItem(item))}
          </div>
          {isArray(list) && isEmpty(list) && (
            <NoResult
              description={t('Sorry, that filter combination has no results.')}
            />
          )}
        </div>
      </div>
    </ModalFromSide>
  );
}
