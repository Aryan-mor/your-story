import { isString } from 'radash';
import { type Dispatch, Fragment, type SetStateAction, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import type { FilterProps } from '../../filter.type';
import type { FilterStateStore } from '../../use-filter.tsx';
import type {
  CheckboxFilter as CheckboxFilterType,
  CheckboxState,
} from './checkbox.filter.type';
import useOnChangeCheckboxFilter from './use-on-change.checkbox.filter';

export type CheckboxFilterProps<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: CheckboxState;
  onChange: undefined | Dispatch<SetStateAction<FILTER_STATE>>;
} & FilterProps<CheckboxFilterType<T>>;

export default function CheckboxFilter<
  T,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({ filter, state, onChange }: CheckboxFilterProps<T, FILTER_STATE>) {
  const handleChangeActive = useOnChangeCheckboxFilter({
    filter,
    onChange,
  });

  useEffect(() => {
    if (state.value) return;
    const initialCheckboxState: CheckboxState['value'] = {};
    filter.items.forEach((it) => {
      initialCheckboxState[it.value] = it.defaultChecked ?? false;
    });
    const newCheckboxState: CheckboxState = {
      key: filter.key,
      type: filter.type,
      value: initialCheckboxState,
    };
    onChange?.((state) => ({
      ...state,
      [filter.key]: newCheckboxState,
    }));
  }, [filter, onChange, state.value]);

  return (
    <div
      className={twMerge(
        'flex w-full flex-wrap gap-2 p-1',
        filter.className,
        filter.classNames?.base,
      )}>
      <span className="font-normal text-gray-700">{filter.label?.()}</span>
      {filter.items.map((checkboxFilterItem) => {
        const onClick = (newValue: boolean) =>
          handleChangeActive(checkboxFilterItem, newValue);
        return (
          <Fragment key={checkboxFilterItem.value}>
            {isString(checkboxFilterItem.label) ? (
              <Fragment>
                <span onClick={() => onClick(false)}>
                  {checkboxFilterItem.label}
                </span>
              </Fragment>
            ) : (
              checkboxFilterItem.label(
                Boolean(state.value?.[checkboxFilterItem.value]),
                onClick,
              )
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
