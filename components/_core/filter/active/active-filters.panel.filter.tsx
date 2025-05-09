import { isEmpty } from 'radash';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { twMerge } from 'tailwind-merge';
import { type FilterState, FilterType } from '../filter.type';
import type { FilterPanelProps } from '../panel/panel.filter';
import type { FilterStateStore, TBase } from '../use-filter';
import ActiveItemFilter from './active-item.filter';

export type ActiveFilterProps<
  STATE extends FilterState,
  FILTER,
  FILTER_PANEL extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
> = {
  state: STATE;
  filter: FILTER;
  returnLabel?: undefined | boolean;
  onStateChange?:
    | undefined
    | FilterPanelProps<FILTER_PANEL, FILTER_STATE>['onStateChange'];
};

export default function ActiveFiltersPanelFilter<
  T extends TBase,
  FILTER_STATE extends FilterStateStore = FilterStateStore,
>({
  filterState,
  filters,
  onStateChange,
  className,
}: { className?: undefined | string } & Pick<
  FilterPanelProps<T, FILTER_STATE>,
  'filters' | 'filterState' | 'onStateChange'
>) {
  const [isFilterListIsEmpty, setIsFilterListIsEmpty] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const statesToShow = useMemo(
    () =>
      Object.values(filterState).filter(
        (filterState) => filterState.type === FilterType.Popup,
      ),
    [filterState],
  );

  const statesToShowComponents = useMemo(
    () =>
      statesToShow.map((state) => {
        const stateKey = state.key;
        const filter = filters.find((filter) => filter.key === stateKey);

        if (!filter) return <Fragment key={stateKey} />;

        return (
          <Fragment key={stateKey}>
            <ActiveItemFilter
              state={state}
              filter={filter}
              onStateChange={onStateChange}
            />
          </Fragment>
        );
      }),
    [filters, onStateChange, statesToShow],
  );

  useEffect(() => {
    const virtualContainer = document.createElement('div');

    const root = createRoot(virtualContainer);
    root.render(
      <AppWithCallbackAfterRender
        root={root}
        setIsFilterListIsEmpty={setIsFilterListIsEmpty}
        statesToShowComponents={statesToShowComponents}
        virtualContainer={virtualContainer}
      />,
    );
  }, [statesToShow, statesToShowComponents]);

  if (isFilterListIsEmpty || isEmpty(statesToShow)) return <Fragment />;

  return (
    <div
      ref={ref}
      className={twMerge('flex flex-wrap gap-2 pb-1 pt-3', className)}
    >
      {statesToShowComponents}
    </div>
  );
}

function AppWithCallbackAfterRender({
  virtualContainer,
  root,
  statesToShowComponents,
  setIsFilterListIsEmpty,
}: {
  virtualContainer: HTMLDivElement;
  root: Root;
  statesToShowComponents: JSX.Element[];
  setIsFilterListIsEmpty: (newVal: boolean) => void;
}) {
  useEffect(() => {
    const hasDOMElements = Array.from(virtualContainer.childNodes).some(
      (node) => node.childNodes.length > 0,
    );

    setIsFilterListIsEmpty(!hasDOMElements);
    root.unmount();
  });

  return <>{statesToShowComponents}</>;
}
