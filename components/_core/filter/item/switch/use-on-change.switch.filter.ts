import { useCallback } from 'react';
import { isNil } from '../../../../../utils/is-nil';
import { FilterType } from '../../filter.type';
import type { FilterStateStore, TBase } from '../../use-filter';
import { type SwitchFilterProps } from './switch.filter';

export default function useOnChangeSwitchFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filter,
  onChange,
}: Pick<SwitchFilterProps<T, FILTER_STATE>, 'filter' | 'onChange'>) {
  return useCallback(
    (newValue: null | undefined | boolean) =>
      onChange?.((state) => ({
        ...state,
        [filter.key]: {
          key: filter.key,
          type: FilterType.Switch,
          value: isNil(newValue) ? null : newValue,
        },
      })),
    [filter, onChange],
  );
}
