import { Fragment } from 'react';
import type { ActiveFilterProps } from '../../active/active-filters.panel.filter';
import ActiveItemFilter from '../../active/active-item.filter';
import type { FilterStateStore, TBase } from '../../use-filter';
import type { PopupFilter, PopupState } from './popup.filter.type';
import useOnChangePopupFilter from './use-on-change.popup.filter';

export default function ActivePopupFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  onStateChange,
}: ActiveFilterProps<PopupState, PopupFilter<T>, T, FILTER_STATE>) {
  const handleChange = useOnChangePopupFilter({
    state,
    filter,
    onChange: onStateChange,
  });

  return Object.values(state.value ?? {}).map((popupAcceptableState) => {
    const popupFilter = filter.filters.find(
      (cFilter) => cFilter.key === popupAcceptableState.key,
    );
    if (!popupFilter) return <Fragment key={popupAcceptableState.key} />;
    return (
      <ActiveItemFilter
        key={popupAcceptableState.key}
        state={popupAcceptableState}
        filter={popupFilter}
        onStateChange={
          onStateChange
            ? (newState) => handleChange(popupAcceptableState.key, newState)
            : undefined
        }
      />
    );
  });
}
