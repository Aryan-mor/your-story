import { clone, isEmpty, isFunction } from 'radash';
import { type SetStateAction, useCallback } from 'react';
import { type FilterState, FilterType } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter';
import { type NestedFilterProps } from './nested.filter';
import {
  isNestedAcceptableState,
  type NestedAcceptableState,
} from './nested.filter.type';

export default function useOnChangeNestedFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ state, filter, onChange }: NestedFilterProps<T, FILTER_STATE>) {
  return useCallback(
    (
      filterKey: string,
      filterState: SetStateAction<Record<string, FilterState>>,
    ) => {
      return onChange?.((prevState) => {
        const newState = isFunction(filterState)
          ? filterState(state.value ?? {})
          : filterState;

        const returnState: Record<string, FilterState> = {};
        if (state?.type == FilterType.Nested) {
          const childFilterState = newState[filterKey];
          if (isNestedAcceptableState(childFilterState)) {
            let newValues = state.value ?? {};
            newValues[filterKey] = clone(childFilterState);
            const filterIndex = filter.filters.findIndex(
              (nestedFilter) => nestedFilter.key === childFilterState.key,
            );

            if (filterIndex > -1 && childFilterState.value === null) {
              //remove all value if first filter removed
              if (filterIndex === 0) {
                newValues = {};
              } else {
                //to remove this filter and all filter after that we will pick all filter before this filters
                const activeFilters = filter.filters.slice(0, filterIndex);
                const filteredValue: Record<string, NestedAcceptableState> = {};

                activeFilters.forEach((activeFilter) => {
                  const newValue = newValues[activeFilter.key];
                  if (newValue) filteredValue[activeFilter.key] = newValue;
                });
                newValues = filteredValue;
              }
            }
            returnState[filter.key] = {
              key: filter.key,
              type: FilterType.Nested,
              value: isEmpty(newValues) ? null : { ...newValues },
            };
          }
        }

        return {
          ...prevState,
          ...returnState,
        };
      });
    },
    [filter.filters, filter.key, onChange, state?.type, state.value],
  );
}
