import { AutocompleteItem } from '@heroui/react';
import type { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import Autocomplete from '../../../_form/autocomplete/autocomplete';
import type { FilterProps } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter';
import type {
  AutocompleteFilter as AutocompleteFilterType,
  AutocompleteState,
} from './autocomplete.filter.type';
import useOnChangeAutocompleteFilter from './use-on-change.autocomplete.filter';

export type AutocompleteFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: AutocompleteState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<AutocompleteFilterType<T, FILTER_STATE>>;

export default function AutocompleteFilter<
  T,
  FILTER_STATE extends FilterStateStore,
>({ filter, state, onChange }: AutocompleteFilterProps<T, FILTER_STATE>) {
  const handleChangeActive = useOnChangeAutocompleteFilter({
    filter,
    onChange,
  });

  return (
    <Autocomplete
      label={filter.label?.()}
      placeholder={filter.placeholder ?? ''}
      isClearable={false}
      classNames={{
        base: twMerge('w-58', filter.className),
      }}
      selectedKey={state.value ?? ''}
      defaultInputValue={
        filter.options.find((it) => it.value === state.value)?.label ?? ''
      }
      onSelectionChange={handleChangeActive}
    >
      {filter.options.map((option) => (
        <AutocompleteItem
          key={option.value}
          value={option.value}
          isDisabled={!!option.hidden}
        >
          {option.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
