import type { Dispatch, SetStateAction } from 'react';
import type { FilterProps } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import ItemFilter from '../item.filter';
import type {
  NestedFilter as NestedFilterType,
  NestedState,
} from './nested.filter.type';
import useOnChangeNestedFilter from './use-on-change.nested.filter';

export type NestedFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: NestedState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<NestedFilterType<T>>;

export default function NestedFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: NestedFilterProps<T, FILTER_STATE>) {
  const handleChange = useOnChangeNestedFilter({
    state,
    filter,
    onChange,
  });

  return (
    <div className="flex gap-2">
      {filter.filters.map((filterItem) => (
        <ItemFilter
          key={filterItem.key}
          filter={filterItem}
          state={state.value?.[filterItem.key]}
          onStateChange={(newState) => handleChange(filterItem.key, newState)}
        />
      ))}
    </div>
  );
}
