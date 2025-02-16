import { Progress } from '@heroui/react';
import { getSkillLevelColor } from '../../../utils/category-color.ts';
import { tw } from '../../../utils/tw.ts';

export type ProgressWithPercentageModuleProps = {
  percentage: number;
  showDash: boolean;
};

export default function ProgressWithPercentageModule({
  percentage = 0,
  showDash,
}: ProgressWithPercentageModuleProps) {
  const color = getSkillLevelColor(
    percentage <= 33 ? 2 : percentage <= 66 ? 4 : 8,
  );

  if (showDash) return <div>-</div>;
  return (
    <div className="flex items-end">
      <div className="-ml-3.5 flex h-8 w-8 rotate-[-90deg] items-center">
        <Progress
          value={percentage}
          size="sm"
          color={color?.componentColor}
          classNames={{
            base: 'max-w-md',
            indicator: tw(color?.backgroundColor),
          }}
        />
      </div>
      <span
        className={tw('font-base -mb-0.5 -ml-2.5 w-[40px] text-sm font-medium')}
      >
        {percentage}%
      </span>
    </div>
  );
}
