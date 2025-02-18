import { Plus, Trash } from 'lucide-react';
import { isEmpty } from 'radash';
import { type Dispatch, type SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../button/button';
import type { FilterProps, FilterState } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter';
import ItemFilter from '../item.filter';
import {
  getInitialItem,
  type RepeatFilter as RepeatFilterType,
  type RepeatState,
} from './repeat.filter.type';
import useOnChangeRepeatFilter from './use-on-change.repeat.filter';

export type RepeatFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: RepeatState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<RepeatFilterType<T>>;

export default function RepeatFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: RepeatFilterProps<T, FILTER_STATE>) {
  const { t } = useTranslation();
  const handleChange = useOnChangeRepeatFilter({
    state,
    filter,
    onChange,
  });
  const filterItem = filter.filter;

  const stateValues = useMemo(() => {
    return !isEmpty(state.value) ? state.value : [getInitialItem(filterItem)];
  }, [filterItem, state.value]);

  return (
    <div className="mb-1 flex flex-col gap-2">
      {stateValues?.map((repeatAcceptableState, index) => (
        <div key={filterItem.key + index} className="flex items-center gap-2">
          <ItemFilter
            filter={filter.filter}
            state={repeatAcceptableState}
            onStateChange={(
              newState: SetStateAction<Record<string, FilterState>>,
            ) => handleChange(filterItem.key, index, newState)}
          />
          <Button
            isIconOnly
            color="default"
            size="sm"
            variant="light"
            onPress={() => handleChange(filterItem.key, index, null)}
          >
            <Trash size={18} />
          </Button>
        </div>
      ))}
      <span
        className="flex w-fit cursor-pointer items-center py-1 text-gray-500 hover:text-gray-900"
        onClick={() =>
          handleChange(
            filterItem.key,
            stateValues?.length ?? 0,
            {
              [filterItem.key]: getInitialItem(filterItem),
            },
            true,
          )
        }
      >
        <Plus className="mr-1" size={16} />
        {filter.label?.() ?? t('Add filter')}
      </span>
    </div>
  );
}
