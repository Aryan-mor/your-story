import useDrawer from '@/components/_core/drawer/use.drawer';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import { useLevel } from '@/req/use-levels';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';
import addEditClickableZoneDrawer from './edit.clickable-zone.drawer';
import {
  useClickableZone,
  useClickableZones,
  useRemoveClickableZone,
} from '@/req/use-clickable-zone';
import Circle from '@/components/_core/konva/circle';
import Button from '@/components/_core/button/button';
import { Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import useLoading from '@/utils/use-loading';

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
  const removeClickableZone = useRemoveClickableZone({
    levelId,
    storyId,
  });
  const { isLoading, onLoadingFinished, onLoadingStart } = useLoading();

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  const handleRemoveClicableZone = useCallback(() => {
    if (!levelId) return;
    onLoadingStart();
    removeClickableZone(levelId, {
      onStalled: onLoadingFinished,
    });
  }, [levelId]);

  const {
    handleOpenDrawer: handleOpenClickableZoneDrawer,
    renderDrawer: renderClickableZoneDrawer,
  } = useDrawer(addEditClickableZoneDrawer);

  return (
    <div
      className="border flex justify-between rounded-lg p-2"
      onClick={() =>
        isLoading
          ? handleOpenClickableZoneDrawer({
              storyId,
              levelId,
              clickableZoneId,
            })
          : undefined
      }
    >
      <div className="w-full gap-3">
        <span className="text-base font-semibold">
          {isLoading ? clickableZone?.note : ''}
        </span>
        <Button isIconOnly={true} onPress={handleRemoveClicableZone}>
          <Trash2 />
        </Button>
      </div>
      <Stage width={displayWidth} height={displayHeight}>
        <Layer>
          <Image width={displayWidth} height={displayHeight} image={image} />
          {clickableZones?.filter()?.map((clickableZoneId) => {
            const isPrimaryZone = clickableZone.id === clickableZoneId;
            return (
              <Circle
                key={clickableZoneId}
                clickableZoneId={clickableZone}
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
