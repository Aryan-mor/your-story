import type {
  AutocompleteFilter,
  AutocompleteState,
} from './item/autocomplete/autocomplete.filter.type';
import type {
  CheckboxFilter,
  CheckboxState,
} from './item/checkbox/checkbox.filter.type';
import type {
  NestedFilter,
  NestedState,
} from './item/nested/nested.filter.type';
import type { PopupFilter, PopupState } from './item/popup/popup.filter.type';
import type {
  RepeatFilter,
  RepeatState,
} from './item/repeat/repeat.filter.type';
import type {
  SearchFilter,
  SearchState,
} from './item/search/search.filter.type';
import type {
  SelectFilter,
  SelectState,
} from './item/select/select.filter.type';
import type {
  SwitchFilter,
  SwitchState,
} from './item/switch/switch.filter.type';

export enum FilterType {
  Search,
  Select,
  AutoComplete,
  Nested,
  Repeat,
  Popup,
  Checkbox,
  Switch,
}

export type FilterBase<T extends FilterType> = {
  key: string;
  type: T;
  label?: (count?: number) => string;
  className?: string;
  hiddenDivider?: boolean;
  isHidden?: boolean;
  isInvisible?: boolean;
};

export type Filter<T> =
  | SelectFilter<T>
  | AutocompleteFilter<T>
  | SearchFilter<T>
  | PopupFilter<T>
  | NestedFilter<T>
  | RepeatFilter<T>
  | CheckboxFilter<T>
  | SwitchFilter<T>;

export type FilterProps<T> = {
  filter: T;
};

export type FilterState =
  | SearchState
  | SelectState
  | AutocompleteState
  | NestedState
  | PopupState
  | RepeatState
  | CheckboxState
  | SwitchState;
