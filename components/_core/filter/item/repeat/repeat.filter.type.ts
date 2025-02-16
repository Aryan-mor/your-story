import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import {
  type AutocompleteFilter,
  type AutocompleteState,
  isAutocompleteState,
} from '../autocomplete/autocomplete.filter.type';
import {
  isNestedState,
  type NestedAcceptableFilters,
  type NestedFilter,
  type NestedState,
} from '../nested/nested.filter.type';
import {
  isSelectState,
  type SelectFilter,
  type SelectState,
} from '../select/select.filter.type';

type RepeatAcceptableFilters<T> =
  | (Extract<Filter<T>, SelectFilter<T> | AutocompleteFilter<T>> &
      NestedAcceptableFilters<T>)
  | NestedFilter<T>;

export type RepeatFilter<T> = {
  filter: RepeatAcceptableFilters<T>;
} & FilterBase<FilterType.Repeat>;

export type RepeatAcceptableState =
  | RepeatState
  | NestedState
  | SelectState
  | AutocompleteState;

export type RepeatState = {
  value: null | RepeatAcceptableState[];
} & Pick<FilterBase<FilterType.Repeat>, 'type' | 'key'>;

export const getInitialItem = <T>(
  filter: RepeatAcceptableFilters<T>,
): RepeatAcceptableState => {
  return {
    key: filter.key,
    type: filter.type,
    value: null,
  };
};

export const isRepeatState = (state?: FilterState): state is RepeatState => {
  return state?.type === FilterType.Repeat;
};

export const isRepeatFilter = <T>(filter: Filter<T>): filter is RepeatFilter<T> => {
  return filter.type === FilterType.Repeat;
};

export const isRepeatAcceptableState = (
  state?: FilterState,
): state is RepeatAcceptableState => {
  return isNestedState(state) || isAutocompleteState(state) || isSelectState(state);
};
