import { useTranslation } from 'react-i18next';
import type { FormError } from './use-error-watcher';
import Alert, { Severity } from '../../alert/alert';

export default function ErrorAlert({ formError }: { formError: FormError }) {
  const { t } = useTranslation();
  return (
    <Alert
      severity={Severity.Error}
      title={
        formError.message ??
        t(
          'There are missing fields on {{label}}. Please complete them to finalize.',
          {
            label: formError.label,
          },
        )
      }
      firstAction={{
        children: t('Check errors'),
        onPress: formError.onClick,
      }}
    />
  );
}
