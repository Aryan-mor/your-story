import { Fragment } from 'react';
import type { ActiveFilterProps } from '../../active/active-filters.panel.filter';
import ActiveItemFilter from '../../active/active-item.filter';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { RepeatFilter, RepeatState } from './repeat.filter.type';
import useOnChangeRepeatFilter from './use-on-change.repeat.filter';

export default function ActiveRepeatFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  onStateChange,
}: ActiveFilterProps<RepeatState, RepeatFilter<T>, T, FILTER_STATE>) {
  const handleChange = useOnChangeRepeatFilter({
    state,
    filter,
    onChange: onStateChange,
  });

  return state.value?.map((repeatAcceptableState, index) => {
    if (!filter.filter) return <Fragment key={repeatAcceptableState.key} />;
    return (
      <Fragment key={repeatAcceptableState.key}>
        <ActiveItemFilter
          state={repeatAcceptableState}
          filter={filter.filter}
          onStateChange={
            onStateChange
              ? (newState) =>
                  handleChange(repeatAcceptableState.key, index, newState)
              : undefined
          }
        />
      </Fragment>
    );
  });
}
