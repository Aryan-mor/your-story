import type { SwitchProps } from '@heroui/react';
import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore } from '../../use-filter';

type SwitchFilterItem = {
  value: boolean;
};

export type SwitchFilter<T> = {
  defaultOption?: SwitchFilterItem['value'];
  componentProps?: Pick<SwitchProps, 'classNames'>;
  onChange?:
    | undefined
    | ((
        value: SwitchFilterItem['value'],
        filteredData: FilterData<T>,
        filterState: FilterStateStore,
      ) => FilterData<T>);
} & FilterBase<FilterType.Switch>;

export type SwitchState = {
  value: null | SwitchFilterItem['value'];
} & Pick<FilterBase<FilterType.Switch>, 'type' | 'key'>;

export const isSwitchState = (state?: FilterState): state is SwitchState => {
  return state?.type === FilterType.Switch;
};

export const isSwitchFilter = <T>(
  filter: Filter<T>,
): filter is SwitchFilter<T> => {
  return filter.type === FilterType.Switch;
};
