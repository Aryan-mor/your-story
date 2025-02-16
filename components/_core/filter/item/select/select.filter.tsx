import { SelectItem } from '@heroui/react';
import clsx from 'clsx';
import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Select from '../../../_form/select/select';
import type { FilterProps } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import type {
  SelectFilter as SelectFilterType,
  SelectState,
} from './select.filter.type';
import useOnChangeSelectFilter from './use-on-change.select.filter';

export type SelectFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: SelectState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<SelectFilterType<T>>;

export default function SelectFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: SelectFilterProps<T, FILTER_STATE>) {
  const handleChangeActive = useOnChangeSelectFilter({
    filter,
    onChange,
  });

  useEffect(() => {
    const defaultOption = filter.defaultOption;
    if (state.value || !defaultOption) return;
    handleChangeActive(defaultOption);
  }, [filter, handleChangeActive, state]);

  return (
    <Select
      label={filter.label?.()}
      placeholder={filter.placeholder ?? ''}
      {...(filter.componentProps ?? {})}
      classNames={{
        ...filter.componentProps?.classNames,
        base: twMerge(
          'w-48',
          clsx({
            hidden: filter.isHidden,
            invisible: filter.isInvisible,
          }),
          filter.componentProps?.classNames?.base,
          filter.className,
        ),
        value: filter.componentProps?.classNames?.value,
      }}
      value={state.value ?? ''}
      defaultSelectedKeys={filter.defaultOption ?? ''}
      selectedKeys={state.value ? [state.value] : []}
      onChange={(e) => {
        if (filter.required && !e.target.value) return;
        return handleChangeActive(e.target.value);
      }}
    >
      {filter.options.map((option) => (
        <SelectItem key={option.value ?? ''} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
}
