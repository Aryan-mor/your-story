import clsx from 'clsx';
import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import SearchInput from '../../../_form/input/search.input.tsx';
import type { FilterStateStore } from '../../use-filter.tsx';
import type {
  SearchFilter as SearchFilterType,
  SearchState,
} from './search.filter.type';

export default function SearchFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  state,
  filter,
  onSearchChange,
}: {
  state: SearchState;
  filter: SearchFilterType<T>;
  onSearchChange: Dispatch<SetStateAction<FILTER_STATE>>;
}) {
  const handleTextChange = useCallback(
    (text: string) =>
      onSearchChange((prevState) => ({
        ...prevState,
        [state.key]: {
          ...state,
          value: text,
        },
      })),
    [onSearchChange, state],
  );

  return (
    <SearchInput
      className="w-48"
      isClearable
      value={state.value ?? ''}
      classNames={{
        base: twMerge(
          clsx(filter.className, {
            'flex-1': !filter.className?.includes('w-'),
          }),
        ),
      }}
      onChange={(e) => handleTextChange(e.target.value)}
      placeholder={filter.label?.() ?? undefined}
      onClear={() => handleTextChange('')}
    />
  );
}
