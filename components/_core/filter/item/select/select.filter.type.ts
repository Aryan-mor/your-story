import type { SelectProps } from '@heroui/react';
import type { ReactNode } from 'react';
import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore } from '../../use-filter';

type SelectFilterItem = {
  value: string;
  label: string | ReactNode;
};
export type SelectFilter<T> = {
  options: SelectFilterItem[];
  placeholder?: string;
  defaultOption?: SelectFilterItem['value'];
  required?: boolean;
  componentProps?: Pick<
    SelectProps,
    'startContent' | 'selectorIcon' | 'classNames'
  >;
  onChange?:
    | undefined
    | ((
        value: null | SelectFilterItem['value'],
        filteredData: FilterData<T>,
        filterState: FilterStateStore,
      ) => FilterData<T>);
} & FilterBase<FilterType.Select>;

export type SelectState = {
  value: null | SelectFilterItem['value'];
} & Pick<FilterBase<FilterType.Select>, 'type' | 'key'>;

export const isSelectState = (state?: FilterState): state is SelectState => {
  return state?.type === FilterType.Select;
};

export const isSelectFilter = <T>(
  filter: Filter<T>,
): filter is SelectFilter<T> => {
  return filter.type === FilterType.Select;
};
