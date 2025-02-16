import { clone, isFunction } from 'radash';
import { type SetStateAction, useCallback } from 'react';
import { type FilterState, FilterType } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import { type PopupFilterProps } from './popup.filter';
import { isPopupAcceptableState } from './popup.filter.type';

export default function useOnChangePopupFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ state, filter, onChange }: PopupFilterProps<T, FILTER_STATE>) {
  return useCallback(
    (
      filterKey: string,
      filterState: SetStateAction<Record<string, FilterState>>,
    ) => {
      return onChange?.((prevState) => {
        const newState = isFunction(filterState)
          ? filterState(state.value ?? {})
          : filterState;

        const popupState = newState[filter.key]
          ? newState[filter.key]
          : {
              key: filter.key,
              type: FilterType.Popup,
              value: {},
            };
        if (popupState?.type == FilterType.Popup) {
          const childFilterState = newState[filterKey];
          if (isPopupAcceptableState(childFilterState)) {
            newState[filter.key] = {
              key: filter.key,
              type: filter.type,
              value: {
                ...(popupState?.value ?? {}),
                [filterKey]: clone(childFilterState),
              },
            };
            delete newState[filterKey];
          }
        }
        return {
          ...prevState,
          ...newState,
        };
      });
    },
    [filter.key, filter.type, onChange, state.value],
  );
}
