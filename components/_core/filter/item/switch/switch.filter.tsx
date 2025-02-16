import { Switch } from '@heroui/react';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import type { FilterProps } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import type {
  SwitchFilter as SwitchFilterType,
  SwitchState,
} from './switch.filter.type';

import useOnChangeSwitchFilter from './use-on-change.switch.filter';

export type SwitchFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: SwitchState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<SwitchFilterType<T>>;

export default function SwitchFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: SwitchFilterProps<T, FILTER_STATE>) {
  const handleChangeActive = useOnChangeSwitchFilter({
    filter,
    onChange,
  });

  useEffect(() => {
    const defaultOption = filter.defaultOption;
    if (state.value !== null || defaultOption === undefined) return;
    handleChangeActive(defaultOption);
  }, [filter, handleChangeActive, state]);

  return (
    <Switch
      size="sm"
      isSelected={state.value ?? false}
      classNames={{
        ...filter.componentProps?.classNames,
        base: twMerge(
          filter.componentProps?.classNames?.base,
          filter.className,
        ),
      }}
      onChange={(e) => handleChangeActive(e.target.checked)}
    >
      {filter.label?.()}
    </Switch>
  );
}
