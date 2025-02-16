import { useTranslation } from 'react-i18next';
import WithAutoHandleActionModal, {
  type WithAutoHandleActionModalProps,
} from './with-auto-handle.action.modal';

export type DeleteWithAutoHandleActionModalType = WithAutoHandleActionModalProps;

export default function DeleteWithAutoHandleActionModal({
  children,
  ...props
}: DeleteWithAutoHandleActionModalType) {
  const { t } = useTranslation();

  return (
    <WithAutoHandleActionModal
      title={t('Remove')}
      message={t('Are you sure you want to delete this? This cannot be undone.')}
      {...props}
      primaryAction={{
        variant: 'solid',
        color: 'danger',
        children: t('Remove'),
        ...props.primaryAction,
      }}
      closeButtonAction={{
        variant: 'bordered',
        children: t('Cancel'),
        ...props.closeButtonAction,
      }}>
      {children}
    </WithAutoHandleActionModal>
  );
}
