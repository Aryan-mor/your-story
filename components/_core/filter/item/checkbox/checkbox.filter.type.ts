import {
  type Filter,
  type FilterBase,
  type FilterState,
  FilterType,
} from '../../filter.type';
import type { FilterData, FilterStateStore } from '../../use-filter';

export type CheckboxFilterItem = {
  value: string;
  defaultChecked?: boolean;
  label:
    | string
    | ((value: boolean, onChange: (checked: boolean) => void) => JSX.Element);
};

export type CheckboxFilter<T> = {
  items: CheckboxFilterItem[];
  required?: boolean;
  classNames?: {
    base?: undefined | string;
  };
  onChange?:
    | undefined
    | ((
        value: null | Record<CheckboxFilterItem['value'], boolean>,
        filteredData: FilterData<T>,
        filterState: FilterStateStore,
      ) => FilterData<T>);
} & FilterBase<FilterType.Checkbox>;

export type CheckboxState = {
  value: null | Record<CheckboxFilterItem['value'], boolean>;
} & Pick<FilterBase<FilterType.Checkbox>, 'type' | 'key'>;

export const isCheckboxState = (
  state?: FilterState,
): state is CheckboxState => {
  return state?.type === FilterType.Checkbox;
};

export const isCheckboxFilter = <T>(
  filter: Filter<T>,
): filter is CheckboxFilter<T> => {
  return filter.type === FilterType.Checkbox;
};
