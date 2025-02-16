import clsx from 'clsx';
import { CircleAlert, Loader, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import type { UseAutoSaveReturn } from './use-auto-save';

type AutoSaveProps = {
  autoSaveProps: UseAutoSaveReturn;
};
export default function AutoSave({ autoSaveProps }: AutoSaveProps) {
  const { t } = useTranslation();
  const { isFormValid, isSaving, showSavedButton } = autoSaveProps;
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-1 select-none items-center text-base font-light opacity-0 transition-all duration-300',
          {
            'opacity-100': !isFormValid || isSaving || showSavedButton,
            'text-red-600': !isFormValid,
          },
        ),
      )}>
      {!isFormValid ? (
        <>
          <CircleAlert className="mr-2" size={20} />
          <span className="min-w-28">{t('Form has error')}</span>
        </>
      ) : isSaving ? (
        <>
          <Loader
            className="mr-2 animate-spin"
            size={20}
            style={{
              animationDuration: '2000ms',
            }}
          />
          <span className="min-w-28">{t('Saving')}</span>
        </>
      ) : (
        <>
          <Save className="mr-2" size={20} />
          <span className="min-w-28">{t('Auto saved')}</span>
        </>
      )}
    </div>
  );
}
