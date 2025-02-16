import { Table as NextUiTable, type TableProps } from '@heroui/react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const defaultTableProps: TableProps = {
  shadow: 'none',
  classNames: {
    wrapper: 'overflow-visible py-0',
    th: 'text-aos-co-secondary text-sm',
  },
};

const Table = forwardRef<HTMLElement | null, TableProps>(
  ({ ...props }: TableProps, ref) => {
    return (
      <NextUiTable
        ref={ref}
        aria-label="table"
        {...defaultTableProps}
        {...props}
        classNames={{
          ...props.classNames,
          wrapper: twMerge(
            defaultTableProps.classNames?.wrapper,
            props.classNames?.wrapper,
          ),
          th: twMerge(
            defaultTableProps.classNames?.th,
            clsx({
              '[&:first-child]:w-0':
                props.selectionMode && props.selectionMode !== 'none',
            }),
            props.classNames?.th,
          ),
        }}
      />
    );
  },
);

export default Table;
