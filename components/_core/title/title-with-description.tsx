import { Accordion, AccordionItem } from '@heroui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOpen } from '../../../utils/use-open';
import { TextEditor } from '../../text-editor/text-editor';
import Title, { type TitleProps } from './title';

export default function TitleWithDescription({
  titleProps,
  description,
  descriptionButtonLabel,
}: {
  titleProps: TitleProps;
  description?: undefined | string;
  descriptionButtonLabel?:
    | undefined
    | {
        showMore?: string;
        showLess?: string;
      };
}) {
  const { t } = useTranslation();
  const { isOpen, onReverse } = useOpen();
  return (
    <div>
      <Title
        {...titleProps}
        suffix={
          description ? (
            <span
              className="flex cursor-pointer select-none items-center text-sm"
              onClick={onReverse}
            >
              {isOpen
                ? (descriptionButtonLabel?.showLess ?? t('Show less'))
                : (descriptionButtonLabel?.showMore ?? t('Show more'))}{' '}
              {isOpen ? (
                <ChevronUp className="ml-1" size={17} />
              ) : (
                <ChevronDown className="ml-1" size={17} />
              )}
            </span>
          ) : undefined
        }
      >
        {titleProps.children}
      </Title>
      {description && (
        <Accordion
          itemClasses={{
            heading: 'hidden',
          }}
          selectedKeys={isOpen ? new Set(['1']) : new Set([])}
          keepContentMounted
        >
          <AccordionItem
            key="1"
            hideIndicator
            aria-label="description"
            title={undefined}
          >
            <div className="h-full overflow-hidden">
              <TextEditor
                className="text-base font-light text-gray-600"
                value={description ?? ''}
                noEdit
              />
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
