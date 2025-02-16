import { Divider } from '@heroui/react';
import { type Dispatch, Fragment, type SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import ActiveFiltersPanelFilter from '../active/active-filters.panel.filter';
import type { Filter, FilterState } from '../filter.type';
import ItemFilter from '../item/item.filter';
import type { FilterStateStore, TBase } from '../use-filter';

export type FilterPanelProps<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  label?: undefined | string;
  filters: Filter<T>[];
  filterState: Record<string, FilterState>;
  showDivider: boolean;
  classNames?:
    | undefined
    | {
        root?: string;
        activeFiltersPanel?: string;
      };
  onStateChange: Dispatch<SetStateAction<FILTER_STATE>>;
};

const PanelFilter = <
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  label,
  filters,
  filterState,
  showDivider,
  classNames,
  onStateChange,
}: FilterPanelProps<T, FILTER_STATE>) => {
  return (
    <>
      <div
        className={twMerge(
          'align-center flex flex-1 flex-wrap gap-aos-g-xl',
          classNames?.root,
        )}
      >
        {label && (
          <span className="flex items-center font-normal text-gray-700">
            {label}
          </span>
        )}
        {filters.map((filter, index) => {
          const render = (
            <ItemFilter
              filter={filter}
              state={filterState?.[filter.key]}
              onStateChange={onStateChange}
            />
          );

          const divider =
            !showDivider ||
            filter.hiddenDivider ||
            !render ||
            index === filters.length - 1 ? (
              <Fragment />
            ) : (
              <Divider
                as="i"
                className="h-auto items-stretch"
                orientation="vertical"
              />
            );

          return (
            <Fragment key={filter.key}>
              {render}
              {divider}
            </Fragment>
          );
        })}
      </div>
      <ActiveFiltersPanelFilter
        filters={filters}
        filterState={filterState}
        onStateChange={onStateChange}
        className={classNames?.activeFiltersPanel}
      />
    </>
  );
};

export default PanelFilter;
