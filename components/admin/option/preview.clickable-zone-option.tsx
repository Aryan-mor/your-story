import useDrawer from '@/components/_core/drawer/use.drawer';
import AddEditOptionDrawer from './add-edit.option.drawer';
import Button from '@/components/_core/button/button';
import { Pencil } from 'lucide-react';
import ClickableZoneOption from '../../../.history/types/clickableZone/option.clickableZone_20250223112019';

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
  return (
    <div>
      <span>{clickableZoneOption?.text}</span>
      <span>
        <Button
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
      {renderAddEditOptionDrawer}
    </div>
  );
}
