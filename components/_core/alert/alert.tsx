import {
  CircleAlert,
  CircleCheck,
  Info,
  type LucideIcon,
  TriangleAlert,
  X,
} from 'lucide-react';
import { Fragment, type ReactNode } from 'react';
import ButtonLink, { ButtonLinkProps } from '../button-link/button-link';
import { tw } from '@/utils/tw';
import Button from '../button/button';
import { Accordion, AccordionItem } from '@heroui/react';

export enum Severity {
  Default,
  Success,
  Error,
  Info,
  Warning,
}

const severityProps: Record<
  Severity,
  { classNames: AlertProps['classNames']; icon: LucideIcon }
> = {
  [Severity.Default]: {
    classNames: {
      root: 'bg-aos-bg-action-neutral-light-default',
      title: 'text-aos-co-action-neutral-onLight',
      icon: 'text-aos-co-action-neutral-onLight',
    },
    icon: Info,
  },
  [Severity.Info]: {
    classNames: {
      root: 'bg-aos-bg-action-primary-light-default ',
      title: 'text-aos-co-action-primary-onLight',
      icon: 'text-aos-co-action-primary-onLight',
    },
    icon: Info,
  },
  [Severity.Error]: {
    classNames: {
      root: 'bg-aos-bg-action-error-light-default',
      title: 'text-aos-co-action-error-onLight',
      icon: 'text-aos-co-action-error-onLight',
    },
    icon: CircleAlert,
  },
  [Severity.Warning]: {
    classNames: {
      root: 'bg-aos-bg-action-warning-light-default',
      title: 'text-aos-co-action-warning-onLight',
      icon: 'text-aos-co-action-warning-onLight',
    },
    icon: TriangleAlert,
  },
  [Severity.Success]: {
    classNames: {
      root: 'bg-aos-bg-action-success-light-default',
      title: 'text-aos-co-action-success-onLight',
      icon: 'text-aos-co-action-success-onLight',
    },
    icon: CircleCheck,
  },
};

type AlertProps = {
  severity: Severity;
  classNames?: {
    accordionRoot?: string;
    root?: string;
    icon?: string;
    content?: string;
    description?: string;
    title?: string;
    closeButton?: string;
  };
  hide?: undefined | boolean;
  title?: undefined | ReactNode;
  description?: undefined | ReactNode;
  icon?: LucideIcon;
  onClose?: () => void | undefined;
  firstAction?: undefined | ButtonLinkProps;
  secondAction?: undefined | ButtonLinkProps;
};

export default function Alert({
  severity,
  icon,
  title,
  classNames,
  description,
  hide,
  onClose,
  firstAction,
  secondAction,
}: AlertProps) {
  const { classNames: severityClassName, icon: severityIcon } =
    severityProps[severity];
  const CheckedIcon = icon || severityIcon;

  const alertEl = (
    <div
      className={tw(
        'flex items-start rounded-aos-lg p-aos-sm',
        severityClassName?.root,
        classNames?.root,
      )}
    >
      <CheckedIcon
        className={tw(
          'mr-aos-sm mt-1 min-h-6 min-w-6',
          severityClassName?.icon,
          classNames?.icon,
        )}
      />
      <div
        className={tw(
          'relative flex flex-col gap-aos-g-xs',
          severityClassName?.content,
          classNames?.content,
        )}
      >
        <div className="flex justify-between">
          <span
            className={tw(
              'min-h-6 pt-1 text-base font-semibold',
              severityClassName?.title,
              classNames?.title,
            )}
          >
            {title}
          </span>
          {onClose && (
            <Button
              className={tw(
                'min-h-6 min-w-6 text-aos-co-action-neutral-onEmpty',
                severityClassName?.closeButton,
                {
                  invisible: !onClose,
                },
                classNames?.closeButton,
              )}
              isIconOnly
              size="sm"
              variant="light"
              onPress={onClose}
            >
              <X size="18" />
            </Button>
          )}
        </div>
        {description && <span className="text-sm">{description}</span>}
        <div className="flex gap-aos-g-lg">
          {firstAction && (
            <ButtonLink
              {...firstAction}
              className={tw(
                'text-aos-co-action-neutral-onEmpty',
                firstAction.className,
              )}
            />
          )}
          {secondAction && (
            <ButtonLink
              {...secondAction}
              className={tw(
                'text-aos-co-action-neutral-onEmpty',
                secondAction.className,
              )}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (hide === undefined) {
    return alertEl;
  }

  return (
    <Accordion
      className={tw('px-0', classNames?.accordionRoot)}
      itemClasses={{
        content: 'py-0',
        heading: 'hidden',
      }}
      selectedKeys={hide ? [] : ['1']}
    >
      <AccordionItem key="1" indicator={<Fragment />}>
        {alertEl}
      </AccordionItem>
    </Accordion>
  );
}
