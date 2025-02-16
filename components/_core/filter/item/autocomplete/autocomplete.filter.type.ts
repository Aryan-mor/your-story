import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore } from '../../use-filter';

export type AutocompleteFilterItem = {
  value: string;
  label: string;
  hidden?: boolean | undefined;
};
export type AutocompleteFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  options: AutocompleteFilterItem[];
  placeholder?: string;
  onChange?: (
    value: null | AutocompleteFilterItem['value'],
    filteredData: FilterData<T>,
    filterState: FILTER_STATE,
  ) => FilterData<T>;
} & FilterBase<FilterType.AutoComplete>;

export type AutocompleteState = {
  value: null | AutocompleteFilterItem['value'];
} & Pick<FilterBase<FilterType.AutoComplete>, 'type' | 'key'>;

export const isAutocompleteState = (
  state?: undefined | FilterState,
): state is AutocompleteState => {
  return state?.type === FilterType.AutoComplete;
};

export const isAutocompleteFilter = <T>(
  filter: Filter<T>,
): filter is AutocompleteFilter<T> => {
  return filter.type === FilterType.AutoComplete;
};
