import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Section, { type SectionProps } from './section';

export type ContentItem = {
  label?: string;
  children: ReactNode;
  classNames?: {
    label?: string;
    content?: string;
  };
};
export type ContentSectionProps = {
  items: ContentItem[];
  sectionClassNames?: SectionProps['classNames'] & ContentItem['classNames'];
};
export default function ContentSection({
  items,
  sectionClassNames = {},
}: ContentSectionProps) {
  return (
    <Section
      classNames={{
        ...sectionClassNames,
        body: twMerge('gap-aos-g-4xl', sectionClassNames?.body),
      }}>
      <Section.Body>
        {items.map(({ label, children, classNames = {} }) => (
          <div key={label} className="grid grid-cols-12 flex-wrap gap-2">
            <div
              className={twMerge(
                'col-span-full text-lg font-semibold text-aos-co-secondary xl:col-span-3',
                sectionClassNames?.label,
                classNames.label,
              )}>
              {label}
            </div>
            <div
              className={twMerge(
                'col-span-full flex flex-col space-y-6 xl:col-span-6',
                sectionClassNames?.content,
                classNames.content,
              )}>
              {children}
            </div>
          </div>
        ))}
      </Section.Body>
    </Section>
  );
}
