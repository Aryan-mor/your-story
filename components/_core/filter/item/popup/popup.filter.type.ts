import type { LucideIcon } from 'lucide-react';
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
  isRepeatState,
  type RepeatFilter,
  type RepeatState,
} from '../repeat/repeat.filter.type';
import {
  isSelectState,
  type SelectFilter,
  type SelectState,
} from '../select/select.filter.type';

type PopupAcceptableFilters<T> =
  | (Extract<Filter<T>, SelectFilter<T> | AutocompleteFilter<T>> &
      NestedAcceptableFilters<T>)
  | NestedFilter<T>
  | RepeatFilter<T>;

export type PopupFilter<T> = {
  filters: PopupAcceptableFilters<T>[];
  icon?: LucideIcon;
} & FilterBase<FilterType.Popup>;

type PopupAcceptableState =
  | RepeatState
  | NestedState
  | SelectState
  | AutocompleteState;

export type PopupState = {
  value: null | Record<string, PopupAcceptableState>;
} & Pick<FilterBase<FilterType.Popup>, 'type' | 'key'>;

export const isPopupState = (state: FilterState): state is PopupState => {
  return state.type === FilterType.Popup;
};

export const isPopupFilter = <T>(
  filter: Filter<T>,
): filter is PopupFilter<T> => {
  return filter.type === FilterType.Popup;
};

export const isPopupAcceptableState = (
  state?: FilterState,
): state is PopupAcceptableState => {
  return (
    isRepeatState(state) ||
    isNestedState(state) ||
    isAutocompleteState(state) ||
    isSelectState(state)
  );
};
