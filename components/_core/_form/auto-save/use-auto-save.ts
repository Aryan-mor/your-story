import { useEffect, useMemo, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { useOpen } from '../../../../utils/use-open';
import { removeIdFromFormData } from '../utils.form';

type UseAutoSaveProps<FORM extends FieldValues> = {
  form: UseFormReturn<FORM>;
  overrideData?: undefined | ((formData: FORM) => FORM);
  onUpdate: (formData: FORM) => Promise<unknown>;
};

export type UseAutoSaveReturn = {
  isDataChanged: boolean;
  isSaving: boolean;
  isFormValid: boolean;
  isFormDirty: boolean;
  showSavedButton: boolean;
};

export default function useAutoSave<FORM extends FieldValues>({
  form,
  overrideData,
  onUpdate,
}: UseAutoSaveProps<FORM>): UseAutoSaveReturn {
  const {
    watch,
    formState: { isDirty, errors, isValid },
  } = form;

  const rawWatchAll = watch();
  const watchAll = useMemo(() => {
    const rawWatchAllWithoutId = removeIdFromFormData(rawWatchAll);

    return overrideData?.(rawWatchAllWithoutId) ?? rawWatchAllWithoutId;
  }, [overrideData, rawWatchAll]);
  const [lastValue, setLastValue] = useState<string | undefined>();
  const [showSavedButton, setShowSavedButton] = useState(false);
  const {
    isOpen: isSaving,
    onOpen: onSavingStart,
    onClose: onSavingEnd,
  } = useOpen(false);

  const jsonWatchAll = JSON.stringify(watchAll);

  const isDataChanged = useMemo(() => {
    return Boolean(lastValue && jsonWatchAll !== lastValue);
  }, [jsonWatchAll, lastValue]);

  useEffect(() => {
    if (!lastValue || !isDataChanged || !isValid) {
      onSavingEnd();
      setShowSavedButton(false);
      setLastValue(jsonWatchAll);
      return;
    }

    onSavingStart();
    let onSavingStartTimeout: NodeJS.Timeout | undefined;
    const timeout = setTimeout(() => {
      setLastValue(jsonWatchAll);
      setShowSavedButton(true);
      onUpdate(watchAll).finally(() => {
        onSavingEnd();
        onSavingStartTimeout = setTimeout(() => {
          setShowSavedButton(false);
        }, 2500);
      });
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(onSavingStartTimeout);
    };
  }, [
    errors,
    isDataChanged,
    isValid,
    jsonWatchAll,
    lastValue,
    onSavingEnd,
    onSavingStart,
    onUpdate,
    watchAll,
  ]);

  return {
    isDataChanged,
    isSaving,
    isFormValid: isValid,
    isFormDirty: isDirty || isDataChanged,
    showSavedButton,
  };
}
