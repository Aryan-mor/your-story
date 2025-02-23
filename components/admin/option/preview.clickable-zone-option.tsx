import useDrawer from '@/components/_core/drawer/use.drawer';
import AddEditOptionDrawer from './add-edit.option.drawer';
import Button from '@/components/_core/button/button';
import { Pencil } from 'lucide-react';
import { useLevel } from '@/req/use-levels';

export default function PreviewClickableZoneOption({
  storyId,
  levelId,
  clickableZoneId,
  clickableZoneOption,
}: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
  clickableZoneOption: undefined | ClickableZoneOption;
}) {
  const {
    renderDrawer: renderAddEditOptionDrawer,
    handleOpenDrawer: handleOpenAddEditOptionDrawer,
  } = useDrawer(AddEditOptionDrawer);

  const { data: nextLevel } = useLevel({
    id: clickableZoneOption?.nextLevelId,
    storyId,
  });

  return (
    <div className="flex flex-col gap-3 w-full border rounded-lg p-3">
      <div className="flex gap-3 w-full justify-between items-center">
        <span className="text-base font-semibold">
          {clickableZoneOption?.text}
        </span>
        <span>
          <Button
            isIconOnly={true}
            onPress={() =>
              handleOpenAddEditOptionDrawer({
                storyId,
                levelId,
                clickableZoneId,
                clickableZoneOptionId: clickableZoneOption?.id,
              })
            }
          >
            <Pencil />
          </Button>
        </span>
      </div>
      {nextLevel && (
        <span>
          <span className="text-gray-500 text-sm">Next level:</span>{' '}
          {nextLevel?.title}
        </span>
      )}
      {renderAddEditOptionDrawer}
    </div>
  );
}
