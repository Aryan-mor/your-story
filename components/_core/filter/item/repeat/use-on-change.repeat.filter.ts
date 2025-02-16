import { clone, isFunction } from 'radash';
import { type SetStateAction, useCallback } from 'react';
import { type FilterState, FilterType } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import { type RepeatFilterProps } from './repeat.filter';
import {
  getInitialItem,
  isRepeatAcceptableState,
  type RepeatAcceptableState,
} from './repeat.filter.type';

export default function useOnChangeRepeatFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ state, filter, onChange }: RepeatFilterProps<T, FILTER_STATE>) {
  return useCallback(
    (
      filterKey: string,
      filterIndex: number,
      filterState: null | SetStateAction<Record<string, FilterState>>,
      isNew: boolean = false,
    ) => {
      return onChange?.((prevState) => {
        const prevStateItem = state.value?.[filterIndex];

        const prevStateToPass: Record<string, FilterState> = prevStateItem
          ? {
              [prevStateItem.key]: prevStateItem,
            }
          : {};

        let newState = isFunction(filterState)
          ? filterState(prevStateToPass)
          : filterState;

        //remove from list if it's not new and state value is null
        if (
          !isNew &&
          newState &&
          newState[filterKey] &&
          !newState[filterKey]?.value
        ) {
          newState = null;
        }

        const returnState: Record<string, FilterState> = {};
        const newValue = state.value ?? [];
        if (state?.type == FilterType.Repeat) {
          const childFilterState = newState?.[filterKey];
          if (newState === null) {
            newValue.splice(filterIndex, 1);
            returnState[filter.key] = {
              key: filter.key,
              type: FilterType.Repeat,
              value: [...newValue],
            };
          } else if (isRepeatAcceptableState(childFilterState)) {
            newValue[filterIndex] = clone(childFilterState);

            const safeNewValue: RepeatAcceptableState[] = [];
            for (let i = 0; i < newValue.length; i += 1) {
              safeNewValue[i] = newValue[i] ?? getInitialItem(filter.filter);
            }
            returnState[filter.key] = {
              key: filter.key,
              type: FilterType.Repeat,
              value: [...safeNewValue],
            };
          }
        }

        return {
          ...prevState,
          ...returnState,
        };
      });
    },
    [filter.filter, filter.key, onChange, state?.type, state.value],
  );
}
