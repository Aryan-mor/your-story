import { useEffect, useMemo, useRef, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';

import { removeIdFromFormData } from '../utils.form';

export type FormError = {
  message?: string;
  label?: string;
  onClick: () => void;
};
type UseErrorWatcherProps<FORM extends FieldValues> = {
  form: UseFormReturn<FORM>;
  checkErrors: (data: FORM) => FormError[];
};

export default function useErrorWatcher<FORM extends FieldValues>({
  form,
  checkErrors,
}: UseErrorWatcherProps<FORM>) {
  const { watch } = form;
  const rawWatchAll = watch();
  const watchAll = useMemo(() => removeIdFromFormData(rawWatchAll), [rawWatchAll]);

  const [errors, setErrors] = useState<FormError[]>([]);
  const lastValue = useRef<string>('');
  useEffect(() => {
    const jsonWatchAll = JSON.stringify(watchAll);
    if (jsonWatchAll === lastValue.current) return;
    lastValue.current = jsonWatchAll;
    setErrors(checkErrors(watchAll));
  }, [checkErrors, watchAll]);

  return { errors };
}
