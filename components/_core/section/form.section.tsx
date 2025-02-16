import { X } from 'lucide-react';
import Button from '../button/button';
import DeleteWithAutoHandleActionModal, {
  type DeleteWithAutoHandleActionModalType,
} from '../modal/action-modal/delete.with-auto-handle.action.modal';
import ContentSection, {
  type ContentItem,
  type ContentSectionProps,
} from './content-section';

export type FormSectionProps = {
  onDeleteProps?:
    | undefined
    | ({
        title?: undefined | string;
        message?: undefined | string;
      } & Pick<
        DeleteWithAutoHandleActionModalType,
        'skipConfirmation' | 'primaryAction'
      >);
} & Omit<ContentSectionProps, 'items'> &
  ContentItem;

export default function FormSection({
  label,
  children,
  classNames = {},
  sectionClassNames = {},
  onDeleteProps,
}: FormSectionProps) {
  return (
    <div className="relative w-full">
      <ContentSection
        sectionClassNames={sectionClassNames}
        items={[
          {
            label: label ?? '',
            children,
            classNames,
          },
        ]}
      />
      {onDeleteProps && (
        <DeleteWithAutoHandleActionModal {...onDeleteProps}>
          <Button
            className="absolute -right-10 top-0 ml-1"
            isIconOnly
            size="sm"
            variant="light">
            <X size={20} className="text-gray-700" />
          </Button>
        </DeleteWithAutoHandleActionModal>
      )}
    </div>
  );
}
