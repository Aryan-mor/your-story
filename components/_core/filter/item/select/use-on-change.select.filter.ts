import { useCallback } from 'react';
import { isNil } from '../../../../../utils/is-nil';
import { FilterType } from '../../filter.type';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { SelectFilterProps } from './select.filter';

export default function useOnChangeSelectFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filter,
  onChange,
}: Pick<SelectFilterProps<T, FILTER_STATE>, 'filter' | 'onChange'>) {
  return useCallback(
    (newValue: null | undefined | string) =>
      onChange?.((state) => ({
        ...state,
        [filter.key]: {
          key: filter.key,
          type: FilterType.Select,
          value: isNil(newValue) ? null : newValue,
        },
      })),
    [filter, onChange],
  );
}
