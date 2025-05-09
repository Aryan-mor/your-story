import { useCallback, useMemo } from 'react';
import type { ActiveFilterProps } from '../../active/active-filters.panel.filter';
import ChipActiveItemFilter from '../../active/chip.active-item.filter';
import type { FilterStateStore, TBase } from '../../use-filter';
import type {
  AutocompleteFilter,
  AutocompleteState,
} from './autocomplete.filter.type';
import useOnChangeAutocompleteFilter from './use-on-change.autocomplete.filter';

export default function ActiveAutocompleteFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  returnLabel,
  onStateChange,
}: ActiveFilterProps<
  AutocompleteState,
  AutocompleteFilter<T>,
  T,
  FILTER_STATE
>) {
  const label = useMemo(
    () => filter.options.find((it) => it.value === state.value)?.label,
    [filter.options, state.value],
  );

  const handleChangeActive = useOnChangeAutocompleteFilter({
    filter: filter,
    onChange: onStateChange,
  });

  const handleRemoveClicked = useCallback(() => {
    handleChangeActive(null);
  }, [handleChangeActive]);

  return (
    <ChipActiveItemFilter
      returnLabel={returnLabel}
      onRemoveClick={onStateChange ? handleRemoveClicked : undefined}
    >
      {label}
    </ChipActiveItemFilter>
  );
}
