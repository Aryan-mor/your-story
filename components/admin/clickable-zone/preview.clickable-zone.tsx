import useDrawer from '@/components/_core/drawer/use.drawer';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import { useLevel } from '@/req/use-levels';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import addEditClickableZoneDrawer from './add-edit.clickable-zone.drawer';
import { useClickableZone, useClickableZones } from '@/req/use-clickable-zone';
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
  storyId,
  clickableZoneId,
}: ClickableZonePreviewProps) {
  const { data: level } = useLevel({ storyId, id: levelId });

  const { data: clickableZones } = useClickableZones({
    levelId,
    storyId,
  });
  const { data: clickableZone } = useClickableZone({
    levelId,
    storyId,
    id: clickableZoneId,
  });

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  const {
    handleOpenDrawer: handleOpenClickableZoneDrawer,
    renderDrawer: renderClickableZoneDrawer,
  } = useDrawer(addEditClickableZoneDrawer);

  return (
    <div
      className="border flex justify-between rounded-lg p-2"
      onClick={() =>
        handleOpenClickableZoneDrawer({
          storyId,
          levelId,
          clickableZoneId,
        })
      }
    >
      <div>
        <span className="text-base font-semibold">{clickableZone?.note}</span>
      </div>
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
