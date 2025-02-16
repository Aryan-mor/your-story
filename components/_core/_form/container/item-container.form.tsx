import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import Button from '../../button/button';
import DeleteWithAutoHandleActionModal from '../../modal/action-modal/delete.with-auto-handle.action.modal';
import type { FormSectionProps } from '../../section/form.section';

type ItemContainerFormProps = {
  label: string;
  isRequired?: boolean;
  classNames?: {
    root?: string;
    labelRoot?: string;
    childrenRoot?: string;
  };
  children: ReactNode | ReactNode[];
} & Pick<FormSectionProps, 'onDeleteProps'>;

export default function ItemContainerForm({
  label,
  isRequired,
  children,
  classNames,
  onDeleteProps,
}: ItemContainerFormProps) {
  const { t } = useTranslation();
  return (
    <div className={twMerge('flex w-full flex-wrap gap-2', classNames?.root)}>
      <div className={twMerge('flex flex-col md:w-5/12', classNames?.labelRoot)}>
        <h3 className="title-case text-base text-aos-co-primary">{label}</h3>
        {!isRequired && (
          <span className="text-sm text-gray-400">({t('Optional')})</span>
        )}
      </div>
      <div className={twMerge('relative flex-1', classNames?.childrenRoot)}>
        {children}
        {onDeleteProps?.primaryAction?.onPress && (
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
    </div>
  );
}
