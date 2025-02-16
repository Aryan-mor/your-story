import { Search, X } from 'lucide-react';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import Input, { type InputProps } from './input.tsx';

const SearchInput = forwardRef<HTMLInputElement | null, InputProps>(
  ({ classNames, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <Input
        ref={ref}
        isClearable
        placeholder={t('Search')}
        startContent={
          <Search
            size={15}
            className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400"
          />
        }
        endContent={<SearchClearIcon />}
        {...props}
        classNames={{
          ...classNames,
          mainWrapper: twMerge('shadow-none', classNames?.mainWrapper),
        }}
      />
    );
  },
);

export const searchIconClassName =
  'w-[18px] min-w-[18px] text-aos-co-action-neutral-onLight';

export const SearchClearIcon = () => {
  return <X size={18} className={searchIconClassName} />;
};

export default SearchInput;
