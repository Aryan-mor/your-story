import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore, TBase } from '../../use-filter';

export type SearchFilter<T extends TBase> = {
  onChange: (
    search: string,
    filteredData: FilterData<T>,
    filterState: FilterStateStore,
  ) => FilterData<T>;
} & FilterBase<FilterType.Search>;

export type SearchState = {
  value: null | string;
} & Pick<FilterBase<FilterType.Search>, 'type' | 'key'>;

export const isSearchState = (state: FilterState): state is SearchState => {
  return state.type === FilterType.Search;
};

export const isSearchFilter = <T>(filter: Filter<T>): filter is SearchFilter<T> => {
  return filter.type === FilterType.Search;
};
