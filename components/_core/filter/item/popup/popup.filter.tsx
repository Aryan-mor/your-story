import {
  Button,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import clsx from 'clsx';
import { Filter } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import type { FilterProps } from '../../filter.type';
import { type FilterStateStore, useActiveFilterCount } from '../../use-filter';
import ItemFilter from '../item.filter';
import type {
  PopupFilter as PopupFilterType,
  PopupState,
} from './popup.filter.type';
import useOnChangePopupFilter from './use-on-change.popup.filter';

export type PopupFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: PopupState;
  onChange?: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<PopupFilterType<T>>;

export default function PopupFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: PopupFilterProps<T, FILTER_STATE>) {
  const { t } = useTranslation();
  const Icon = filter.icon ?? Filter;

  const activeFilters = useActiveFilterCount(state, filter);
  const label =
    filter?.label?.(activeFilters) ??
    t('{{count}} filter', {
      count: activeFilters,
    });

  const handleChange = useOnChangePopupFilter({
    state,
    filter,
    onChange,
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="bordered"
          className={clsx('border-default-200', {
            'flex-1': !filter.className?.includes('w-'),
          })}
        >
          <Icon size={18} />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="">
          <span className="flex px-4 py-2 text-base font-semibold">
            {label}
          </span>
          <Divider />
          <div className="flex flex-col px-4 py-2">
            {filter.filters.map((filterItem) => (
              <ItemFilter
                key={filterItem.key}
                filter={filterItem}
                state={state?.value?.[filterItem.key]}
                onStateChange={(newState) =>
                  handleChange(filterItem.key, newState)
                }
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
