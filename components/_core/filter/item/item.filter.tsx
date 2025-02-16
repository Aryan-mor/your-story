import { type Dispatch, type SetStateAction, useMemo } from 'react';
import type { Filter as FilterItemType, FilterState } from '../filter.type';
import type { FilterStateStore } from '../use-filter.tsx';
import AutocompleteFilter from './autocomplete/autocomplete.filter';
import {
  isAutocompleteFilter,
  isAutocompleteState,
} from './autocomplete/autocomplete.filter.type';
import CheckboxFilter from './checkbox/checkbox.filter';
import { isCheckboxFilter, isCheckboxState } from './checkbox/checkbox.filter.type';
import NestedFilter from './nested/nested.filter';
import { isNestedFilter, isNestedState } from './nested/nested.filter.type';
import PopupFilter from './popup/popup.filter';
import { isPopupFilter, isPopupState } from './popup/popup.filter.type';
import RepeatFilter from './repeat/repeat.filter';
import { isRepeatFilter, isRepeatState } from './repeat/repeat.filter.type';
import SearchFilter from './search/search.filter';
import { isSearchFilter, isSearchState } from './search/search.filter.type';
import SelectFilter from './select/select.filter';
import { isSelectFilter, isSelectState } from './select/select.filter.type';
import SwitchFilter from './switch/switch.filter';
import { isSwitchFilter, isSwitchState } from './switch/switch.filter.type';

export default function ItemFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filter,
  state,
  onStateChange,
}: {
  filter: FilterItemType<T>;
  state: undefined | FilterState;
  onStateChange: Dispatch<SetStateAction<FILTER_STATE>>;
}) {
  const safeState = useMemo(
    () =>
      state ?? {
        key: filter.key,
        type: filter.type,
        value: null,
      },
    [filter.key, filter.type, state],
  );

  if (isSearchFilter(filter) && isSearchState(safeState)) {
    return (
      <SearchFilter
        state={safeState}
        filter={filter}
        onSearchChange={onStateChange}
      />
    );
  }

  if (isSelectFilter(filter) && isSelectState(safeState)) {
    return (
      <SelectFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isAutocompleteFilter(filter) && isAutocompleteState(safeState)) {
    return (
      <AutocompleteFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isCheckboxFilter(filter) && isCheckboxState(safeState)) {
    return (
      <CheckboxFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isSwitchFilter(filter) && isSwitchState(safeState)) {
    return (
      <SwitchFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isNestedFilter(filter) && isNestedState(safeState)) {
    return (
      <NestedFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isRepeatFilter(filter) && isRepeatState(safeState)) {
    return (
      <RepeatFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }

  if (isPopupFilter(filter) && isPopupState(safeState)) {
    return (
      <PopupFilter
        key={filter.key}
        filter={filter}
        state={safeState}
        onChange={onStateChange}
      />
    );
  }
  return null;
}
