import ProgressWithPercentageModule, {
  type ProgressWithPercentageModuleProps,
} from '../../_modules/progress-with-percentage.module.tsx';

export default function ProgressWithPercentageRowTable({
  percentage,
  showDash,
}: Required<ProgressWithPercentageModuleProps>) {
  return {
    value: percentage,
    children: (
      <ProgressWithPercentageModule percentage={percentage} showDash={showDash} />
    ),
  };
}
