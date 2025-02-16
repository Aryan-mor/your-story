import { isEmpty } from 'radash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert, { Severity } from '../../alert/alert';
import ErrorAlert from './error.alert';
import type { FormError } from './use-error-watcher';

type SubmitErrorEditFeedbackProps = {
  errors: FormError[];
  submitAlert?: {
    buttonLabel?: string;
    message?: string;
  };
  showErrors: boolean;
  isSubmitPage: boolean;
  onSelectLaunchTab: () => void;
};
export default function SubmitErrorEdit({
  errors,
  showErrors,
  submitAlert,
  isSubmitPage,
  onSelectLaunchTab,
}: SubmitErrorEditFeedbackProps) {
  const [showSuccess, setShowSuccess] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isEmpty(errors)) {
      setShowSuccess(true);
    }
  }, [errors]);

  useEffect(() => {
    setShowSuccess(false);
  }, [isSubmitPage]);

  if (!showErrors) return null;
  return (
    <div className="flex w-full flex-col gap-3">
      {errors.map((error) => (
        <ErrorAlert key={error.label ?? error.message} formError={error} />
      ))}
      {isEmpty(errors) && showSuccess && (
        <Alert
          severity={Severity.Success}
          title={submitAlert?.message ?? t('You can submit')}
          firstAction={{
            children: submitAlert?.buttonLabel ?? t('Go to submit'),
            onPress: () => {
              onSelectLaunchTab();
              setShowSuccess(false);
            },
          }}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
