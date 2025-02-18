import clsx from 'clsx';
import { Plus } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import { useOpen } from '../../../utils/use-open.ts';
import { searchIconClassName } from '../_form/input/search.input';
import Button, { type ButtonProps } from '../button/button';
import SearchButtonInput from '../search-button-input/search-button-input';

export type SearchWithActionModuleProps = {
  actionButton: undefined | ButtonProps;
  query: string;
  onQueryChange: Dispatch<SetStateAction<string>>;
  classNames?:
    | undefined
    | {
        base?: undefined | string;
      };
};

export default function SearchWithActionModule({
  actionButton,
  query,
  onQueryChange,
  classNames,
}: SearchWithActionModuleProps) {
  const { isOpen: isSearchShow, setIsOpen: setIsSearchShowing } = useOpen();

  return (
    <div className={clsx('flex gap-aos-g-sm px-aos-lg py-4', classNames?.base)}>
      <SearchButtonInput
        classNames={{
          root: !isSearchShow ? 'justify-end' : 'justify-center',
        }}
        query={query}
        onQueryChange={onQueryChange}
        onSearchOpen={setIsSearchShowing}
      />
      {actionButton?.onPress && actionButton?.children && (
        <Button
          radius="lg"
          startContent={<Plus className={searchIconClassName} />}
          {...actionButton}
          className={twMerge(
            clsx('min-w-[unset] !transition-all duration-1000', {
              'w-fit': !isSearchShow,
              'w-[45px] gap-0 !px-0': isSearchShow,
            }),
            actionButton.className,
          )}
        >
          <span
            className={clsx(
              'overflow-hidden transition-opacity delay-100 duration-1000',
              {
                'w-0 opacity-0': isSearchShow,
                'opacity-100': !isSearchShow,
              },
            )}
          >
            {actionButton.children}
          </span>
        </Button>
      )}
    </div>
  );
}
