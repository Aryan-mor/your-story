import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore } from '../../use-filter';
import {
  type AutocompleteFilter,
  type AutocompleteState,
  isAutocompleteState,
} from '../autocomplete/autocomplete.filter.type';
import {
  isSelectState,
  type SelectFilter,
  type SelectState,
} from '../select/select.filter.type';

export type NestedAcceptableFilters<T> = Extract<
  Filter<T>,
  SelectFilter<T> | AutocompleteFilter<T>
>;

export type NestedAcceptableState = SelectState | AutocompleteState;

export type NestedFilter<T> = {
  filters: NestedAcceptableFilters<T>[];
  onChange?: (
    value: null | Record<string, NestedAcceptableState>,
    filteredData: FilterData<T>,
    filterState: FilterStateStore,
  ) => FilterData<T>;
} & FilterBase<FilterType.Nested>;

export type NestedState = {
  value: null | Record<string, NestedAcceptableState>;
} & Pick<FilterBase<FilterType.Nested>, 'type' | 'key'>;

export const isNestedState = (state?: FilterState): state is NestedState => {
  return state?.type === FilterType.Nested;
};

export const isNestedFilter = <T>(
  filter: Filter<T>,
): filter is NestedFilter<T> => {
  return filter.type === FilterType.Nested;
};

export const isNestedAcceptableState = (
  state?: FilterState,
): state is NestedAcceptableState => {
  return isAutocompleteState(state) || isSelectState(state);
};
