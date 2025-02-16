import { isNumber } from 'radash';
import { useCallback } from 'react';
import { FilterType } from '../../filter.type';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { AutocompleteFilterProps } from './autocomplete.filter';
import type { AutocompleteFilterItem } from './autocomplete.filter.type';

export default function useOnChangeAutocompleteFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filter,
  onChange,
}: Pick<AutocompleteFilterProps<T, FILTER_STATE>, 'filter' | 'onChange'>) {
  return useCallback(
    (key: null | AutocompleteFilterItem['value'] | number) => {
      return (
        !isNumber(key) &&
        onChange?.((state) => ({
          ...state,
          [filter.key]: {
            key: filter.key,
            type: FilterType.AutoComplete,
            value: key ?? '',
          },
        }))
      );
    },
    [filter, onChange],
  );
}
