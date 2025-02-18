import {
  Link,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  type TableProps,
  TableRow,
} from '@heroui/react';
import clsx from 'clsx';
import { isInt } from 'radash';
import {
  type Dispatch,
  Fragment,
  type Key,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import useParams from '../../../hooks/use-params.ts';
import { useProfile } from '../../../hooks/use-profile.ts';
import CArray from '../../../utils/cArray.ts';
import CObject from '../../../utils/cObject.ts';
import { notEmpty } from '../../../utils/not-empty.ts';
import useStateWithDefaultHandlerAndStorage from '../../../utils/state/use-state-with-default-handler-and-storage.ts';
import EmptyBodyPage, { EmptyImage } from '../page/body.page/empty.body.page';
import TopContentTable, {
  type TopContentTableProps,
} from './modules/top-content.table/top-content.table';
import Table from './table';

type WizardTableHeader<HEADER extends string, KEY extends Key = ''> = {
  key: HEADER;
  label?: string | ReactNode;
  className?: undefined | string;
  allowsSorting?: boolean;
  clickable?: boolean;
  getSort?:
    | undefined
    | ((rows: RowsPropsItems<HEADER, KEY>[]) => RowsPropsItems<HEADER, KEY>[]);
  allowsCustomize?: boolean;
};

type WizardTableRowItem = {
  value: string | number;
  children?: undefined | ReactNode;
  title?: undefined | string;
};

type WizardTableRow<HEADER extends string, KEY extends Key = ''> = {
  key: KEY;
  classNames?: RowClassNames<HEADER, KEY>;
  rows: Record<HEADER, undefined | WizardTableRowItem>;
};

export type WizardTableSortDescriptorType<HEADER extends string> = null | {
  column: HEADER;
  direction: 'descending' | 'ascending';
};

type RowsPropsItems<
  HEADER extends string,
  KEY extends Key = '',
> = WizardTableRow<HEADER, KEY>;

type RowClassNames<HEADER extends string, KEY extends Key = ''> = Partial<
  Record<HEADER, string>
> &
  WizardTableType<HEADER, KEY>['classNames'];

export type WizardTableHeaderType<
  HEADER extends string,
  KEY extends Key = '',
> = {
  headersProps: {
    items: WizardTableHeader<HEADER, KEY>[];
    classNames?: {
      root?: string;
      item?: string;
    };
  };
};

export type WizardTableCustomize<HEADER extends string> = {
  headers: Partial<
    Record<
      HEADER,
      {
        isHidden: boolean;
      }
    >
  >;
};

export type WizardTableType<HEADER extends string, KEY extends Key = ''> = {
  tableKey: string;
  query?: undefined | string;
  defaultSortDescriptor?:
    | undefined
    | WizardTableSortDescriptorType<HEADER>
    | null;
  sortDescriptor?: undefined | WizardTableSortDescriptorType<HEADER> | null;
  topContentProps?:
    | undefined
    | Pick<TopContentTableProps<HEADER, KEY>, 'actions'>;
  selectedKeys?: undefined | KEY[];
  emptyContent?: undefined | ReactNode;
  onSelectionChange?: undefined | Dispatch<SetStateAction<KEY[]>>;
  onSortDescriptorChange?:
    | undefined
    | Dispatch<SetStateAction<WizardTableSortDescriptorType<HEADER> | null>>;
  defaultCustomize?:
    | undefined
    | Exclude<TopContentTableProps<HEADER, KEY>['customize'], undefined>;
  rowsProps: {
    items: RowsPropsItems<HEADER, KEY>[];
    classNames?: { root?: string } & RowClassNames<HEADER>;
  };
  onRowClick?:
    | undefined
    | ((row: RowsPropsItems<HEADER, KEY>, header: HEADER) => void);
} & WizardTableHeaderType<HEADER, KEY> &
  Partial<
    Pick<
      TopContentTableProps<HEADER, KEY>,
      'customize' | 'onCustomizeChange' | 'searchProps'
    >
  > &
  Omit<
    TableProps,
    'sortDescriptor' | 'onSortChange' | 'selectedKeys' | 'onSelectionChange'
  >;

export default function WizardTable<
  HEADER extends string,
  KEY extends Key = '',
>({
  query: propsQuery,
  tableKey,
  searchProps,
  headersProps,
  rowsProps,
  topContentProps,
  selectedKeys,
  onSelectionChange,
  defaultSortDescriptor: propsDefaultSortDescriptor,
  sortDescriptor: propsSortDescriptor,
  onSortDescriptorChange,
  defaultCustomize: propsDefaultCustomize,
  customize: propsCustomize,
  emptyContent,
  onCustomizeChange,
  onRowClick,
  ...props
}: WizardTableType<HEADER, KEY>) {
  const { t } = useTranslation();
  const { organizationId } = useParams();
  const profile = useProfile();
  const storageKey = `${tableKey}-${organizationId ?? 'org'}-${profile?.id ?? 'prof'}`;
  const [query, setQuery] = useState('');

  const defaultCustomize = useMemo(() => {
    if (propsCustomize) return propsCustomize;
    if (propsDefaultCustomize) return propsDefaultCustomize;
    const defaultCustomize: Exclude<
      WizardTableType<HEADER, KEY>['customize'],
      undefined
    > = {
      headers: CObject.fromEntries(
        headersProps.items
          ?.filter((header) => header.allowsCustomize)
          .map((header) => [
            header.key,
            {
              isHidden: false,
            },
          ]),
      ),
    };
    return defaultCustomize;
  }, [headersProps.items, propsCustomize, propsDefaultCustomize]);

  const [customize, setCustomize] = useStateWithDefaultHandlerAndStorage({
    storageKey: `customize-${storageKey}`,
    value: propsCustomize,
    defaultValue: defaultCustomize,
    setValue: onCustomizeChange,
  });

  const defaultSortDescriptor = useMemo<Exclude<
    WizardTableType<HEADER, KEY>['sortDescriptor'],
    undefined
  > | null>(() => {
    if (propsSortDescriptor) return propsSortDescriptor;
    if (propsDefaultSortDescriptor) return propsDefaultSortDescriptor;

    const header =
      headersProps?.items?.find((header) => header.allowsSorting) ??
      headersProps?.items?.[0];

    if (!header) return null;

    return {
      column: header.key,
      direction: 'ascending',
    };
  }, [headersProps.items, propsDefaultSortDescriptor, propsSortDescriptor]);

  const [sortDescriptor, setSortDescriptor] =
    useStateWithDefaultHandlerAndStorage<Exclude<
      WizardTableType<HEADER, KEY>['sortDescriptor'],
      undefined
    > | null>({
      storageKey: `sortDescriptor-${storageKey}`,
      value: propsSortDescriptor,
      defaultValue: defaultSortDescriptor,
      setValue: onSortDescriptorChange,
    });

  const filteredHeaders = useMemo<
    WizardTableType<HEADER, KEY>['headersProps']
  >(() => {
    if (!customize?.headers) return headersProps;
    return {
      ...headersProps,
      items: headersProps.items.filter(
        (header) => !customize.headers[header.key as HEADER]?.isHidden,
      ),
    };
  }, [customize, headersProps]);

  const filteredRows = useMemo(() => {
    const queries: string[] = [];
    if (searchProps) {
      const q = query?.toLowerCase().replaceAll(' ', '');
      if (q) queries.push(q);
    }
    const propsQueryLowerCase =
      propsQuery?.toLowerCase().replaceAll(' ', '') ?? '';
    if (propsQueryLowerCase) queries.push(propsQueryLowerCase);
    return {
      ...rowsProps,
      items: rowsProps.items.filter((rowItems) => {
        const rows = CObject.values(rowItems.rows).filter(notEmpty);
        return rows.some(({ value }) =>
          queries.every((query) =>
            value.toString().toLowerCase().replaceAll(' ', '').includes(query),
          ),
        );
      }),
    };
  }, [propsQuery, query, rowsProps, searchProps]);

  const sortedRows = useMemo(() => {
    if (!sortDescriptor) return filteredRows.items;

    const rows =
      filteredHeaders.items
        ?.find((head) => head.key === sortDescriptor.column)
        ?.getSort?.(filteredRows.items) ??
      filteredRows.items.sort((a, b) => {
        const aValue = a.rows[sortDescriptor.column]?.value;
        const bValue = b.rows[sortDescriptor.column]?.value;
        if (aValue === undefined || bValue === undefined) return 1;
        if (isInt(aValue) && isInt(bValue)) {
          return aValue > bValue ? 1 : -1;
        }
        return aValue.toString().trim().localeCompare(bValue.toString().trim());
      }) ??
      [];

    return sortDescriptor.direction === 'ascending' ? rows : rows.toReversed();
  }, [filteredHeaders.items, filteredRows.items, sortDescriptor]);

  const handleSelectionChange = useCallback<
    Exclude<TableProps['onSelectionChange'], undefined>
  >(
    (keys) => {
      if (keys === 'all') {
        return onSelectionChange?.((selectedKeys) => {
          return CArray.from(selectedKeys).concat(
            sortedRows.map((row) => row.key),
          );
        });
      }
      onSelectionChange?.(CArray.from(keys) as KEY[]);
    },
    [onSelectionChange, sortedRows],
  );

  return (
    <Table
      id={`${tableKey}`}
      topContent={
        <TopContentTable
          searchProps={searchProps}
          query={query}
          headersProps={headersProps}
          onQueryChange={setQuery}
          customize={customize}
          onCustomizeChange={setCustomize}
          {...topContentProps}
        />
      }
      {...props}
      classNames={{
        ...props.classNames,
        th: twMerge(
          clsx({
            'bg-aos-bg-neutral-subtle [&:last-child]:w-0':
              headersProps.items?.[
                headersProps.items.length - 1
              ]?.key?.toLowerCase() === 'actions',
          }),
          props?.classNames?.th,
        ),
        tr: twMerge('group', props?.classNames?.tr),
        td: twMerge(
          'transition-all duration-200 group-hover:bg-aos-bg-accent-gray-onSubtle [&:first-child]:rounded-l-xl [&:last-child]:rounded-r-xl',
          props?.classNames?.td,
        ),
      }}
      {...(sortDescriptor ? { sortDescriptor } : undefined)}
      onSortChange={(sort) =>
        setSortDescriptor(sort as WizardTableSortDescriptorType<HEADER>)
      }
      onSelectionChange={handleSelectionChange}
      {...(selectedKeys
        ? {
            selectedKeys: selectedKeys as Exclude<
              TableProps['selectedKeys'],
              undefined
            >,
          }
        : undefined)}
    >
      <TableHeader
        className={filteredHeaders.classNames?.root}
        columns={filteredHeaders.items}
      >
        {(header) => (
          <TableColumn
            {...header}
            key={header.key}
            className={twMerge(
              'max-w-24 truncate text-aos-co-secondary',
              filteredHeaders.classNames?.item,
              header.className,
            )}
          >
            {header.label ?? header.key}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        className={filteredRows.classNames?.root}
        items={sortedRows}
        emptyContent={
          (emptyContent ?? (propsQuery !== '' || query !== '')) ? (
            <EmptyBodyPage
              label={t('search-general.nothing-found')}
              image={EmptyImage.PlaceholderSearch}
            />
          ) : undefined
        }
      >
        {(item) =>
          item ? (
            <TableRow
              key={item.key}
              className={twMerge(
                filteredRows.classNames?.tr,
                item.classNames?.tr,
              )}
            >
              {(columnKey) => {
                const headerItem = headersProps?.items?.find(
                  (h) => h.key === columnKey,
                );
                const rowItem = item?.rows?.[columnKey as HEADER];
                const children = rowItem?.children ?? rowItem?.value;
                const clickable = !!onRowClick && !!headerItem?.clickable;
                return (
                  <TableCell
                    key={columnKey}
                    title={rowItem?.title}
                    className={twMerge(
                      'relative h-[50px] py-0 hover:[&>a]:bg-black/5 [&>span]:line-clamp-1',
                      filteredRows.classNames?.td ?? '',
                      filteredRows.classNames?.[columnKey as HEADER] ?? '',
                      item.classNames?.td ?? '',
                      item.classNames?.[columnKey as HEADER] ?? '',
                    )}
                  >
                    {clickable ? (
                      <Link
                        className="h-[50px] w-full cursor-pointer pl-1 pr-4 underline [&>*]:w-full"
                        color="foreground"
                        onPress={() => onRowClick(item, columnKey as HEADER)}
                      >
                        {children}
                      </Link>
                    ) : (
                      children
                    )}
                  </TableCell>
                );
              }}
            </TableRow>
          ) : (
            <Fragment />
          )
        }
      </TableBody>
    </Table>
  );
}
