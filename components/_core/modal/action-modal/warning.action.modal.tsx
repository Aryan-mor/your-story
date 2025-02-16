import { useTranslation } from 'react-i18next';
import ActionModal, { type ActionModalProps } from './action.modal';

type WarningActionModalProps = ActionModalProps;
export default function WarningActionModal(props: WarningActionModalProps) {
  const { t } = useTranslation();
  return (
    <ActionModal
      title={t('Warning')}
      message={t('Are you sure you want to do this? This cannot be undone.')}
      {...props}
      primaryAction={{
        variant: 'solid',
        color: 'warning',
        children: t('Do it'),
        ...props.primaryAction,
      }}
      closeButtonAction={{
        variant: 'bordered',
        children: t('Cancel'),
        ...props.closeButtonAction,
      }}
    />
  );
}
