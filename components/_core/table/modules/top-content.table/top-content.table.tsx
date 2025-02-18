import { type InputProps } from '@heroui/react';
import { Columns3 } from 'lucide-react';
import { isEmpty } from 'radash';
import {
  type Dispatch,
  Fragment,
  type Key,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import CArray from '../../../../../utils/cArray.ts';
import SearchInput from '../../../_form/input/search.input';
import Button, { type ButtonPropsWithKey } from '../../../button/button';
import SelectDropdown, {
  type SelectDropdownProps,
} from '../../../dropdown/select.dropdown';
import type {
  WizardTableCustomize,
  WizardTableHeaderType,
} from '../../wizard.table';

export type TopContentTableProps<
  HEADER extends string,
  KEY extends Key = '',
> = {
  searchProps: undefined | Omit<InputProps, 'value' | 'onValueChange'>;
  query: string;
  customize: undefined | WizardTableCustomize<HEADER>;
  actions?: undefined | ButtonPropsWithKey[];
  onCustomizeChange?:
    | undefined
    | Dispatch<SetStateAction<WizardTableCustomize<HEADER>>>;
  onQueryChange: Dispatch<SetStateAction<string>>;
} & WizardTableHeaderType<HEADER, KEY>;

export default function TopContentTable<
  HEADER extends string,
  KEY extends Key = '',
>({
  searchProps,
  query,
  onQueryChange,
  headersProps,
  customize,
  actions,
  onCustomizeChange,
}: TopContentTableProps<HEADER, KEY>) {
  const { t } = useTranslation();

  const customizableHeaders = useMemo(() => {
    if (!customize?.headers || isEmpty(Object.keys(customize.headers)))
      return undefined;
    return Object.keys(customize.headers).filter(
      (key) => !customize.headers[key as HEADER]?.isHidden,
    ) as HEADER[];
  }, [customize?.headers]);

  const onCustomizableHeadersChange = useCallback<
    SelectDropdownProps<HEADER>['onSelectionChange']
  >(
    (keys) => {
      if (!onCustomizeChange || !customize) return;
      const headers: WizardTableCustomize<HEADER>['headers'] = {};
      Object.keys(customize.headers).forEach((it) => {
        headers[it as HEADER] = {
          ...customize.headers[it as HEADER],
          isHidden: !keys.includes(it as HEADER),
        };
      });
      onCustomizeChange({
        ...customize,
        headers,
      });
    },
    [customize, onCustomizeChange],
  );

  const filteredHeadersProps = useMemo(
    () =>
      headersProps.items.filter(
        (header) => header.allowsCustomize && header.label,
      ),
    [headersProps.items],
  );
  const mappedHeaderItems = useMemo(
    () =>
      filteredHeadersProps.map((it) => ({
        key: it.key,
        title: it.label,
      })),
    [filteredHeadersProps],
  );

  const showSearch = !!searchProps;
  const showCustomizableHeaders =
    customizableHeaders && filteredHeadersProps.length > 0;
  if (!showSearch || !showCustomizableHeaders) return <Fragment />;

  return (
    <div className="flex justify-between">
      <div>
        {searchProps !== undefined && (
          <SearchInput
            classNames={{
              base: 'w-full max-w-[250px]',
            }}
            placeholder={t('Search')}
            onClear={() => onQueryChange?.('')}
            {...searchProps}
            value={query}
            onValueChange={onQueryChange}
          />
        )}
      </div>
      <div className="flex gap-aos-g-lg">
        {actions?.map((action) => <Button {...action} key={action.key} />)}
        {CArray.isEmpty(actions) && showCustomizableHeaders && (
          <SelectDropdown<HEADER>
            selectedKeys={customizableHeaders}
            onSelectionChange={onCustomizableHeadersChange}
            dropdownMenuProps={{
              disallowEmptySelection: true,
            }}
            items={mappedHeaderItems}
            onAction={() => {}}
          >
            <Button variant="light" startContent={<Columns3 size={20} />}>
              {t('Columns')}
            </Button>
          </SelectDropdown>
        )}
      </div>
    </div>
  );
}
