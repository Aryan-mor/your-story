import { useCallback } from 'react';
import { FilterType } from '../../filter.type';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { CheckboxFilterProps } from './checkbox.filter';
import { type CheckboxFilterItem, isCheckboxState } from './checkbox.filter.type';

export default function useOnChangeCheckboxFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filter,
  onChange,
}: Pick<CheckboxFilterProps<T, FILTER_STATE>, 'filter' | 'onChange'>) {
  return useCallback(
    (item: CheckboxFilterItem, newValue: boolean) => {
      onChange?.((state) => {
        const checkboxState = state[filter.key];
        if (checkboxState && !isCheckboxState(checkboxState)) return state;

        return {
          ...state,
          [filter.key]: {
            key: filter.key,
            type: FilterType.Checkbox,
            value: {
              ...(checkboxState?.value ?? {}),
              [item.value]: newValue,
            },
          },
        };
      });
    },
    [filter, onChange],
  );
}
