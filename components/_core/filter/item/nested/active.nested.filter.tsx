import clsx from 'clsx';
import { Fragment, useMemo } from 'react';
import type { ActiveFilterProps } from '../../active/active-filters.panel.filter';
import ActiveItemFilter from '../../active/active-item.filter';
import ChipActiveItemFilter, {
  chipActiveItemFilterBaseClassName,
  chipActiveItemFilterContentClassName,
} from '../../active/chip.active-item.filter';
import type { FilterState } from '../../filter.type';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { NestedFilter, NestedState } from './nested.filter.type';
import useOnChangeNestedFilter from './use-on-change.nested.filter';

export default function ActiveNestedFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  onStateChange,
}: ActiveFilterProps<NestedState, NestedFilter<T>, T, FILTER_STATE>) {
  const handleChange = useOnChangeNestedFilter({
    state,
    filter,
    onChange: onStateChange,
  });
  const showIt = useMemo(
    () =>
      !filter.filters.some((nestedFilter) => {
        return !state?.value?.[nestedFilter.key]?.value;
      }),
    [filter.filters, state],
  );

  if (!showIt || Object.keys(state.value ?? {}).length === 0) return null;

  return (
    <ChipActiveItemFilter
      classNames={{
        base: clsx('flex', chipActiveItemFilterBaseClassName),
        content: 'gap-1 px-0 bg-transparent',
      }}
      onRemoveClick={() => {
        const firstFilter = filter.filters[0];
        if (!firstFilter) return;
        const filterState: FilterState = {
          key: firstFilter.key,
          type: firstFilter.type,
          value: null,
        };
        handleChange(firstFilter.key, {
          [firstFilter.key]: filterState,
        });
      }}
    >
      <Fragment>
        {filter.filters.map((nestedFilter) => {
          const nestedAcceptableState = state?.value?.[nestedFilter.key];
          if (!nestedAcceptableState)
            return <Fragment key={nestedFilter.key} />;
          return (
            <div
              key={nestedFilter.key}
              className={clsx(chipActiveItemFilterContentClassName(true), {
                hidden: nestedFilter.isHidden,
              })}
            >
              <ActiveItemFilter
                state={nestedAcceptableState}
                filter={nestedFilter}
                returnLabel={true}
              />
            </div>
          );
        })}
      </Fragment>
    </ChipActiveItemFilter>
  );
}
