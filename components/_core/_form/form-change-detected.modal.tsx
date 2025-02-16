import { useCallback } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type BlockerFunction, useBlocker } from 'react-router';
import ActionModal, {
  type ActionModalProps,
} from '../modal/action-modal/action.modal';

type FormChangeDetectedModalProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSave: (formData: TFieldValues) => void;
} & Omit<
  FormChangeDetectedModalPropsBase,
  'onSave' | 'isOpen' | 'onClose' | 'onLeave'
>;

export default function FormChangeDetectedModal<TFieldValues extends FieldValues>({
  form,
  onSave,
  ...props
}: FormChangeDetectedModalProps<TFieldValues>) {
  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const shouldBlock = useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
    [isDirty],
  );
  const blocker = useBlocker(shouldBlock);

  return (
    <FormChangeDetectedModalBase
      isOpen={blocker.state === 'blocked'}
      onLeave={() => blocker.proceed?.()}
      onClose={() => blocker.reset?.()}
      onSave={() => {
        handleSubmit(onSave)();
        blocker.reset?.();
      }}
      {...props}
    />
  );
}
type FormChangeDetectedModalPropsBase = {
  onLeave: () => void;
  onSave: () => void;
} & ActionModalProps;

function FormChangeDetectedModalBase({
  onLeave,
  onSave,
  ...props
}: FormChangeDetectedModalPropsBase) {
  const { t } = useTranslation();
  return (
    <ActionModal
      title={t('Unsaved changes')}
      size="lg"
      {...props}
      leftAction={{
        children: t('Discard changes'),
        color: 'danger',
        onPress: onLeave,
        ...props.leftAction,
      }}
      closeButtonAction={{
        children: t('Continue editing'),
        onPress: props.onClose,
        ...props.closeButtonAction,
      }}
      primaryAction={{
        children: t('Save'),
        color: 'primary',
        variant: 'solid',
        onPress: onSave,
        ...props.primaryAction,
      }}>
      {t('You have unsaved changes.')}
      <br />
      {t('What would you like to do?')}
    </ActionModal>
  );
}
