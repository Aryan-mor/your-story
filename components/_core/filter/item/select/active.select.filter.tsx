import clsx from 'clsx';
import { useCallback, useMemo } from 'react';
import type { ActiveFilterProps } from '../../active/active-filters.panel.filter';
import ChipActiveItemFilter from '../../active/chip.active-item.filter';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { SelectFilter, SelectState } from './select.filter.type';
import useOnChangeSelectFilter from './use-on-change.select.filter';

export default function ActiveSelectFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  returnLabel,
  onStateChange,
}: ActiveFilterProps<SelectState, SelectFilter<T>, T, FILTER_STATE>) {
  const label = useMemo(
    () => filter.options.find((it) => it.value === state.value)?.label,
    [filter.options, state.value],
  );

  const handleChangeActive = useOnChangeSelectFilter({
    filter: filter,
    onChange: onStateChange,
  });

  const handleRemoveClicked = useCallback(() => {
    handleChangeActive(null);
  }, [handleChangeActive]);

  return (
    <ChipActiveItemFilter
      returnLabel={returnLabel}
      classNames={{
        content: clsx({
          hidden: filter.isHidden,
          invisible: filter.isInvisible,
        }),
      }}
      onRemoveClick={onStateChange ? handleRemoveClicked : undefined}
    >
      {label}
    </ChipActiveItemFilter>
  );
}
