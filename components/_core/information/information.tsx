import {
  CircleAlert,
  CircleCheck,
  Info,
  type LucideIcon,
  TriangleAlert,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { flexCenterStartStyles } from '../../../styles/flex.ts';
import { tw } from '../../../utils/tw.ts';

export enum Severity {
  Default,
  Success,
  Error,
  Info,
  Warning,
}

const severityProps: Record<
  Severity,
  { classNames: InformationProps['classNames']; icon: LucideIcon }
> = {
  [Severity.Default]: {
    classNames: {
      root: 'bg-aos-bg-action-neutral-light-default',
      label: 'text-aos-co-tertiary',
      icon: 'text-aos-co-tertiary',
    },
    icon: Info,
  },
  [Severity.Info]: {
    classNames: {
      root: 'bg-aos-bg-action-primary-light-default ',
      label: 'text-aos-co-action-primary-onLight',
      icon: 'text-aos-co-action-primary-onLight',
    },
    icon: Info,
  },
  [Severity.Error]: {
    classNames: {
      root: 'bg-aos-bg-action-error-light-default',
      label: 'text-aos-co-action-error-onLight',
      icon: 'text-aos-co-action-error-onLight',
    },
    icon: CircleAlert,
  },
  [Severity.Warning]: {
    classNames: {
      root: 'bg-aos-bg-action-warning-light-default',
      label: 'text-aos-co-action-warning-onLight',
      icon: 'text-aos-co-action-warning-onLight',
    },
    icon: TriangleAlert,
  },
  [Severity.Success]: {
    classNames: {
      root: 'bg-aos-bg-action-success-light-default',
      label: 'text-aos-co-action-success-onLight',
      icon: 'text-aos-co-action-success-onLight',
    },
    icon: CircleCheck,
  },
};

type InformationProps = {
  severity: Severity;
  classNames?: {
    root?: string;
    icon?: string;
    label?: string;
  };
  label?: undefined | ReactNode;
  icon?: LucideIcon;
};
export default function Information({
  label,
  icon,
  severity,
  classNames,
}: InformationProps) {
  const { classNames: severityClassName, icon: severityIcon } =
    severityProps[severity];
  const CheckedIcon = icon || severityIcon;

  return (
    <span className={flexCenterStartStyles('text-sm text-gray-500')}>
      <CheckedIcon
        size={17}
        className={tw(
          'mr-aos-3xs min-h-3 min-w-3',
          severityClassName?.icon,
          classNames?.icon,
        )}
      />
      <span
        className={tw('text-tiny', severityClassName?.label, classNames?.label)}
      >
        {label}
      </span>
    </span>
  );
}
