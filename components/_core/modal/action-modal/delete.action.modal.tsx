import { useTranslation } from 'react-i18next';
import Alert, { Severity } from '../../alert/alert';
import ActionModal, { type ActionModalProps } from './action.modal';

type DeleteActionModalProps = {
  showCannotBeUndoneAlert?: boolean;
} & ActionModalProps;
export default function DeleteActionModal({
  showCannotBeUndoneAlert,
  children,
  message,
  ...props
}: DeleteActionModalProps) {
  const { t } = useTranslation();
  return (
    <ActionModal
      title={t('Delete')}
      {...props}
      primaryAction={{
        variant: 'solid',
        color: 'danger',
        children: t('Delete'),
        ...props.primaryAction,
      }}
      closeButtonAction={{
        variant: 'bordered',
        children: t('Cancel'),
        ...props.closeButtonAction,
      }}
    >
      {children ??
        message ??
        t('Are you sure you want to delete this? This cannot be undone.')}
      {showCannotBeUndoneAlert && (
        <Alert
          severity={Severity.Warning}
          title={t('This cannot be undone.')}
        />
      )}
    </ActionModal>
  );
}
