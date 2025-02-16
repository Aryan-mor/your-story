import { ErrorBoundary as SentryErrorBoundary } from '@sentry/react';
import { enqueueSnackbar } from 'notistack';
import {
  Fragment,
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationType } from '../notification/notifications.tsx';

export default function ErrorBoundary({
  children,
  maxErrorRetries = 3,
  onError,
}: {
  children: ReactNode;
  maxErrorRetries?: number | undefined;
  onError?:
    | ((error: unknown, componentStack: string | undefined, eventId: string) => void)
    | undefined;
}) {
  const lastErrors = useRef<Record<string, number>>({});
  return (
    <SentryErrorBoundary
      onError={onError}
      fallback={(props) => (
        <ErrorBoundaryFallback
          lastErrors={lastErrors}
          maxErrorRetries={maxErrorRetries}
          {...props}
        />
      )}>
      {children}
    </SentryErrorBoundary>
  );
}

const ErrorBoundaryFallback = ({
  lastErrors,
  componentStack,
  resetError,
  maxErrorRetries,
  error,
}: {
  lastErrors: MutableRefObject<Record<string, number>>;
  componentStack: string;
  maxErrorRetries: number;
  error: unknown;
  resetError(): void;
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if ((lastErrors.current[componentStack] ?? 0) > maxErrorRetries) return;
    resetError();
    if (!lastErrors.current[componentStack])
      enqueueSnackbar(t('Something went wrong, please try later'), {
        variant: NotificationType.Error,
      });
    lastErrors.current[componentStack] =
      (lastErrors.current[componentStack] ?? 0) + 1;
  }, [componentStack, error, lastErrors, maxErrorRetries, resetError, t]);

  return <Fragment />;
};
