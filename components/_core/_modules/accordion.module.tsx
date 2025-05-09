import {
  Accordion as MuiAccordion,
  AccordionItem,
  type AccordionProps,
} from '@heroui/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type AccordionModuleProps = {
  isOpen: boolean;
  children: ReactNode;
} & Pick<AccordionProps, 'itemClasses'>;
export default function Accordion({
  isOpen,
  children,
  itemClasses,
}: AccordionModuleProps) {
  return (
    <MuiAccordion
      itemClasses={{
        ...itemClasses,
        base: twMerge('px-0', itemClasses?.base),
        heading: twMerge('hidden', itemClasses?.heading),
        content: twMerge('py-0', itemClasses?.content),
      }}
      className="px-0"
      selectedKeys={isOpen ? new Set(['1']) : new Set([])}
      keepContentMounted
    >
      <AccordionItem key="1" hideIndicator title={undefined}>
        {children}
      </AccordionItem>
    </MuiAccordion>
  );
}
