import { twMerge } from 'tailwind-merge';
import ContentSection, { type ContentItem } from './content-section';

type TitleDescriptionSectionProps = {
  title?: ContentItem;
  description?: undefined | ContentItem;
};
const labelClassName = 'text-sm text-aos-co-secondary';

export default function TitleDescriptionSection({
  title,
  description,
}: TitleDescriptionSectionProps) {
  return (
    <ContentSection
      sectionClassNames={{
        content: 'col-span-9 md:col-span-9',
      }}
      items={[
        ...(title
          ? [
              {
                ...title,
                classNames: {
                  ...title.classNames,
                  label: twMerge(labelClassName, title.classNames?.label),
                  content: twMerge(
                    'text-lg font-medium text-aos-co-primary whitespace-pre-wrap',
                    title.classNames?.content,
                  ),
                },
              },
            ]
          : []),
        ...(description
          ? [
              {
                ...description,
                classNames: {
                  ...description.classNames,
                  label: twMerge(labelClassName, description.classNames?.label),
                  content: twMerge(
                    'text-sm font-normal text-aos-co-primary whitespace-pre-wrap',
                    description.classNames?.content,
                  ),
                },
              },
            ]
          : []),
      ]}
    />
  );
}
