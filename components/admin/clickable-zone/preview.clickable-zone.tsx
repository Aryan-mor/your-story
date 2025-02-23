import useDrawer from '@/components/_core/drawer/use.drawer';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import { useLevel } from '@/req/use-levels';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import addEditClickableZoneDrawer from './add-edit.clickable-zone.drawer';
import { useClicableZones } from '@/req/use-clickable-zone';
import Circle from '@/components/_core/konva/circle';

type ClickableZonePreviewProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
};

const originalWidth = 900;
const originalHeight = 1600;

const displayWidth = originalWidth / 5;
const displayHeight = originalHeight / 5;

export default function ClickableZonePreview({
  levelId,
  clickableZoneId,
  storyId,
}: ClickableZonePreviewProps) {
  const { data: level } = useLevel({ storyId, id: levelId });

  const { data: clickableZones } = useClicableZones({
    levelId,
    storyId,
  });

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  const {
    handleOpenDrawer: handleOpenClickableZoneDrawer,
    renderDrawer: renderClickableZoneDrawer,
  } = useDrawer(addEditClickableZoneDrawer);

  return (
    <div
      onClick={() =>
        handleOpenClickableZoneDrawer({
          storyId,
          levelId,
          clickableZoneId,
        })
      }
    >
      <Stage width={displayWidth} height={displayHeight}>
        <Layer>
          <Image width={displayWidth} height={displayHeight} image={image} />
          {clickableZones?.map((clickableZone) => {
            const isPrimaryZone = clickableZone.id === clickableZoneId;
            return (
              <Circle
                key={clickableZone.id}
                clickableZone={clickableZone}
                isPrimaryZone={isPrimaryZone}
                draggable={false}
                displayWidth={displayWidth}
                displayHeight={displayHeight}
              />
            );
          })}
        </Layer>
      </Stage>
      {renderClickableZoneDrawer}
    </div>
  );
}
