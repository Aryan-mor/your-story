import type { Filter, FilterState } from '../filter.type';
import ActiveAutocompleteFilter from '../item/autocomplete/active.autocomplete.filter';
import {
  isAutocompleteFilter,
  isAutocompleteState,
} from '../item/autocomplete/autocomplete.filter.type';
import ActiveNestedFilter from '../item/nested/active.nested.filter';
import {
  isNestedFilter,
  isNestedState,
} from '../item/nested/nested.filter.type';
import ActivePopupFilter from '../item/popup/active.popup.filter';
import { isPopupFilter, isPopupState } from '../item/popup/popup.filter.type';
import ActiveRepeatFilter from '../item/repeat/active.repeat.filter';
import {
  isRepeatFilter,
  isRepeatState,
} from '../item/repeat/repeat.filter.type';
import ActiveSelectFilter from '../item/select/active.select.filter';
import {
  isSelectFilter,
  isSelectState,
} from '../item/select/select.filter.type';
import type { FilterStateStore, TBase } from '../use-filter';
import type { ActiveFilterProps } from './active-filters.panel.filter';

export default function ActiveItemFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  returnLabel,
  onStateChange,
}: ActiveFilterProps<FilterState, Filter<T>, T, FILTER_STATE>) {
  if (isPopupFilter(filter) && isPopupState(state))
    return (
      <ActivePopupFilter
        state={state}
        filter={filter}
        returnLabel={returnLabel}
        onStateChange={onStateChange}
      />
    );

  if (isNestedFilter(filter) && isNestedState(state)) {
    return (
      <ActiveNestedFilter
        state={state}
        filter={filter}
        returnLabel={returnLabel}
        onStateChange={onStateChange}
      />
    );
  }

  if (isSelectFilter(filter) && isSelectState(state)) {
    return (
      <ActiveSelectFilter
        state={state}
        filter={filter}
        returnLabel={returnLabel}
        onStateChange={onStateChange}
      />
    );
  }
  if (isAutocompleteFilter(filter) && isAutocompleteState(state)) {
    return (
      <ActiveAutocompleteFilter
        state={state}
        filter={filter}
        returnLabel={returnLabel}
        onStateChange={onStateChange}
      />
    );
  }
  if (isRepeatFilter(filter) && isRepeatState(state))
    return (
      <ActiveRepeatFilter
        state={state}
        filter={filter}
        returnLabel={returnLabel}
        onStateChange={onStateChange}
      />
    );
  return null;
}
