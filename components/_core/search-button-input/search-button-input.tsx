import type { InputProps } from '@heroui/react';
import clsx from 'clsx';
import { Search } from 'lucide-react';
import { type Dispatch, type SetStateAction, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { tw } from '../../../utils/tw.ts';
import { useOpen } from '../../../utils/use-open';
import SearchInput, {
  SearchClearIcon,
  searchIconClassName,
} from '../_form/input/search.input.tsx';
import Button, { type ButtonProps } from '../button/button';

type SearchButtonInputProps = {
  query: string;
  classNames?:
    | undefined
    | {
        root?: undefined | string;
        button?: undefined | string;
      };
  inputProps?: InputProps;
  searchButtonProps?: ButtonProps;
  onQueryChange: Dispatch<SetStateAction<string>>;
  onSearchOpen?: undefined | ((open: boolean) => void);
};

export default function SearchButtonInput({
  query,
  classNames,
  inputProps,
  searchButtonProps,
  onQueryChange,
  onSearchOpen,
}: SearchButtonInputProps) {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>(null);
  const {
    isOpen: isSearchOpen,
    onOpen: onShowSearch,
    onClose: onHideSearch,
  } = useOpen();

  const handleShowInput = useCallback(() => {
    onShowSearch();
    onSearchOpen?.(true);
    setTimeout(() => {
      ref.current?.focus();
    }, 400);
  }, [onSearchOpen, onShowSearch]);

  const handleHideInput = useCallback(() => {
    onHideSearch();
    onSearchOpen?.(false);
  }, [onHideSearch, onSearchOpen]);

  return (
    <div className={twMerge('flex flex-1', classNames?.root)}>
      <SearchInput
        isClearable={false}
        ref={ref}
        value={query}
        onValueChange={onQueryChange}
        disabled={!isSearchOpen}
        placeholder={t('Search')}
        onBlur={() => {
          if (query === '') handleHideInput();
        }}
        startContent={
          <Button
            onPress={!isSearchOpen ? handleShowInput : () => undefined}
            radius="lg"
            disabled={isSearchOpen}
            isIconOnly={true}
            disableAnimation={true}
            {...searchButtonProps}
            variant={searchButtonProps?.variant ?? 'light'}
            className={twMerge('!bg-transparent', searchButtonProps?.className)}
          >
            <Search
              className={tw(
                searchIconClassName,
                'text-aos-co-action-neutral-onLight',
              )}
            />
          </Button>
        }
        endContent={
          isSearchOpen && (
            <Button
              onPress={() => {
                if (query === '') handleHideInput();
                else onQueryChange('');
              }}
              radius="lg"
              variant="light"
              className={clsx('!bg-transparent group-hover:opacity-100', {
                'opacity-0': query.length === 0,
              })}
              isIconOnly={true}
            >
              <SearchClearIcon />
            </Button>
          )
        }
        {...inputProps}
        classNames={{
          base: clsx(
            'transition-all px-0 duration-400 group',
            {
              'w-[45px] min-w-[45px]': !isSearchOpen,
              'w-full': isSearchOpen,
            },
            inputProps?.classNames?.base,
          ),
          inputWrapper: clsx(
            'px-0 w-full overflow-hidden',
            {
              '!cursor-pointer': !isSearchOpen,
            },
            inputProps?.classNames?.inputWrapper,
          ),
          innerWrapper: clsx('w-full', inputProps?.classNames?.innerWrapper),
          input: clsx(
            'transition-[width_4s_ease_1s,opacity_200ms_ease_1s]',
            {
              'opacity-100': isSearchOpen,
              'placeholder:text-transparent !px-0 w-0': !isSearchOpen,
            },
            inputProps?.classNames?.input,
          ),
        }}
      />
    </div>
  );
}
