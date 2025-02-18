import ProgressWithPercentageModule, {
  type ProgressWithPercentageModuleProps,
} from '../../_modules/progress-with-percentage.module';

export default function ProgressWithPercentageRowTable({
  percentage,
  showDash,
}: Required<ProgressWithPercentageModuleProps>) {
  return {
    value: percentage,
    children: (
      <ProgressWithPercentageModule
        percentage={percentage}
        showDash={showDash}
      />
    ),
  };
}
