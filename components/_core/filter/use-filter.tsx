import { isFunction } from 'radash';
import { useCallback, useMemo, useState } from 'react';
import { type Filter, type FilterState, FilterType } from './filter.type';
import {
  isAutocompleteFilter,
  isAutocompleteState,
} from './item/autocomplete/autocomplete.filter.type';
import {
  isCheckboxFilter,
  isCheckboxState,
} from './item/checkbox/checkbox.filter.type';
import { isNestedFilter, isNestedState } from './item/nested/nested.filter.type';
import {
  isPopupFilter,
  isPopupState,
  type PopupFilter,
  type PopupState,
} from './item/popup/popup.filter.type';
import { isRepeatFilter, isRepeatState } from './item/repeat/repeat.filter.type';
import { isSearchFilter, isSearchState } from './item/search/search.filter.type';
import { isSelectFilter, isSelectState } from './item/select/select.filter.type';
import { isSwitchFilter, isSwitchState } from './item/switch/switch.filter.type';
import type { FilterPanelProps } from './panel/panel.filter';

export type TBase = any;
export type FilterData<T extends TBase> = T;

export type FilterStateStore = Record<string, FilterState>;

type UseFilterProps<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  data: FilterData<T>;
  filters: Filter<T>[] | ((filterState: FilterStateStore) => Filter<T>[]);
  defaultFilterState?: undefined | FILTER_STATE;
  options?: {
    showDivider?: boolean;
    classNames?: FilterPanelProps<T>['classNames'];
  };
};

const useFilter = <
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  data: rawData,
  filters: baseFilters,
  defaultFilterState,
  options,
}: UseFilterProps<T, FILTER_STATE>): {
  filteredData: UseFilterProps<T>['data'];
  filterPanelProps: FilterPanelProps<T, FILTER_STATE>;
  showFilterPanelProps: boolean;
  filterState: FILTER_STATE;
  onReset: () => void;
} => {
  const [filterState, setFilterState] = useState<FILTER_STATE>(
    defaultFilterState ?? ({} as FILTER_STATE),
  );

  const filters = useMemo(() => {
    if (isFunction(baseFilters)) {
      return baseFilters(filterState ?? {});
    }
    return baseFilters;
  }, [baseFilters, filterState]);

  const filteredData = useMemo(() => {
    if (!rawData) return {} as T;
    let filteredData: FilterData<T> = { ...rawData };

    const handleFilter = (
      filter: Filter<T>,
      currentFilterState: Record<string, FilterState>,
    ) => {
      const filterStateItem = currentFilterState[filter.key];

      if (filter.key !== filterStateItem?.key) return;

      if (
        isSearchFilter(filter) &&
        isSearchState(filterStateItem) &&
        filter.onChange
      ) {
        filteredData = filter.onChange(
          filterStateItem?.value ?? '',
          filteredData,
          filterState,
        );
        return;
      }

      if (
        isSelectFilter(filter) &&
        isSelectState(filterStateItem) &&
        filter.onChange
      ) {
        filteredData = filter.onChange(
          filterStateItem.value,
          filteredData,
          filterState,
        );
        return;
      }

      if (
        isAutocompleteFilter(filter) &&
        isAutocompleteState(filterStateItem) &&
        filter.onChange
      ) {
        filteredData = filter.onChange(
          filterStateItem.value,
          filteredData,
          filterState,
        );
        return;
      }

      if (
        isCheckboxFilter(filter) &&
        isCheckboxState(filterStateItem) &&
        filter.onChange
      ) {
        filteredData = filter.onChange(
          filterStateItem.value,
          filteredData,
          filterState,
        );
        return;
      }

      if (
        isSwitchFilter(filter) &&
        isSwitchState(filterStateItem) &&
        filter.onChange
      ) {
        filteredData = filter.onChange(
          filterStateItem.value ?? false,
          filteredData,
          filterState,
        );
        return;
      }

      if (
        isPopupFilter(filter) &&
        isPopupState(filterStateItem) &&
        filterStateItem.value
      ) {
        const value = filterStateItem.value;
        filter.filters.forEach((filter) => {
          handleFilter(filter, value);
        });
        return;
      }

      if (
        isNestedFilter(filter) &&
        isNestedState(filterStateItem) &&
        filterStateItem.value
      ) {
        const value = filterStateItem.value;
        if (filter.onChange) {
          filteredData = filter.onChange(value, filteredData, filterState);
          return;
        }
        filter.filters.forEach((filter) => {
          handleFilter(filter, value);
        });
        return;
      }

      if (
        isRepeatFilter(filter) &&
        isRepeatState(filterStateItem) &&
        filterStateItem.value
      ) {
        const values = filterStateItem.value;
        values.forEach((value) => {
          handleFilter(filter.filter, { [value.key]: value });
        });
        return;
      }
    };
    filters.forEach((filter) => handleFilter(filter, filterState));
    return filteredData;
  }, [filterState, filters, rawData]);

  const handleReset = useCallback(
    () => setFilterState(defaultFilterState ?? ({} as FILTER_STATE)),
    [defaultFilterState],
  );

  const showFilterPanelProps = useMemo(() => {
    return (
      filters.filter((filter) => !filter.isHidden && !filter.isInvisible).length > 0
    );
  }, [filters]);

  return {
    filteredData,
    filterState,
    filterPanelProps: {
      filters,
      filterState,
      showDivider: options?.showDivider ?? true,
      classNames: options?.classNames,
      onStateChange: setFilterState,
    },
    showFilterPanelProps,
    onReset: handleReset,
  };
};

export default useFilter;

export const useActiveFilterCount = <T,>(
  state: PopupState,
  filter: Extract<Filter<T>, PopupFilter<T>>,
) => {
  return useMemo(() => {
    let activeFilters = 0;
    filter.filters.forEach((filterItem) => {
      if (filterItem.type === FilterType.Nested) {
        const nestedFilter = state.value?.[filterItem.key];
        const nestedFilterItemKey = filterItem.filters?.[0]?.key;
        if (
          nestedFilter?.type === FilterType.Nested &&
          nestedFilterItemKey &&
          nestedFilter?.value?.[nestedFilterItemKey]?.value
        ) {
          activeFilters += 1;
        }
      }
    });
    return activeFilters;
  }, [filter, state]);
};
