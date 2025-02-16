import { type SwitchProps, Tooltip } from '@heroui/react';
import clsx from 'clsx';
import { Info, type LucideIcon } from 'lucide-react';
import React, { type ReactNode } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FormDataEditFeedbackType } from '../../../feedback/edit.feedback/form-data.edit.feedback.type';
import Chip from '../../chip/chip';
import Switch from './switch';

export default function CardSwitchForm({
  title,
  icon,
  register,
  switches,
}: {
  title: string | ReactNode;
  icon: LucideIcon;
  register?: UseFormRegister<FormDataEditFeedbackType>;
  switches: SwitchItemProps['item'][];
}) {
  const Icon = icon;
  return (
    <div className="flex flex-col justify-center gap-aos-g-lg rounded-lg border p-4">
      <div className="flex items-center gap-aos-g-sm">
        <div className="rounded-lg bg-gray-100 p-2">
          <Icon className="text-aos-co-tertiary" size={22} />
        </div>
        <h3 className="flex-1 text-lg font-medium text-aos-co-primary">
          {title}
        </h3>
      </div>
      <div className="flex flex-col gap-aos-g-sm">
        {switches.map((switchItem) => (
          <SwitchItem
            key={switchItem.name ?? switchItem.itemKey}
            register={register}
            item={switchItem}
          />
        ))}
      </div>
    </div>
  );
}

type SwitchItemProps = {
  register?: undefined | UseFormRegister<FormDataEditFeedbackType>;
  showAsSwitch?: boolean;
  item: {
    name?: keyof FormDataEditFeedbackType;
    itemKey?: React.Key;
    isLoading?: boolean;
    description: string;
    explanation?: undefined | string | ReactNode;
    isSelected?: SwitchProps['defaultSelected'];
    onValueChange?: SwitchProps['onValueChange'];
  };
};

export const SwitchItem = ({
  register,
  item: switchItem,
  showAsSwitch = true,
}: SwitchItemProps) => {
  const { t } = useTranslation();
  return (
    <div
      key={switchItem.name ?? switchItem.itemKey}
      className="flex w-full justify-between gap-aos-g-sm"
    >
      <p className="text-sm font-medium text-aos-co-primary">
        {switchItem.description}
        {switchItem.explanation && (
          <Tooltip
            showArrow
            content={
              <div className="max-w-[300px] text-sm">
                {switchItem.explanation}
              </div>
            }
          >
            <Info className="mb-1 ml-1 inline" size={15} />
          </Tooltip>
        )}
      </p>
      <div className="flex items-center">
        {showAsSwitch ? (
          <Switch
            size="sm"
            isDisabled={!!switchItem.isLoading}
            onValueChange={switchItem.onValueChange}
            {...(switchItem.isSelected !== undefined
              ? { isSelected: switchItem.isSelected }
              : {})}
            {...(register && switchItem.name ? register(switchItem.name) : {})}
          />
        ) : (
          <Chip
            radius="md"
            classNames={{
              base: clsx('px-0 min-w-[40px] text-center', {
                'bg-blue-50': switchItem.isSelected,
                'bg-yellow-50': !switchItem.isSelected,
              }),
              content: clsx({
                'text-blue-600': switchItem.isSelected,
                'text-yellow-700': !switchItem.isSelected,
              }),
            }}
          >
            {switchItem.isSelected ? t('Yes') : t('No')}
          </Chip>
        )}
      </div>
    </div>
  );
};
