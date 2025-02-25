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
import { Pencil, Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import useLoading from '@/utils/use-loading';
import DeleteWithAutoHandleActionModal from '@/components/_core/modal/action-modal/delete.with-auto-handle.action.modal';

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
    if (!clickableZoneId) return;
    onLoadingStart();
    removeClickableZone(clickableZoneId)?.finally(onLoadingFinished);
  }, [clickableZoneId, onLoadingFinished, onLoadingStart, removeClickableZone]);

  const {
    handleOpenDrawer: handleOpenClickableZoneDrawer,
    renderDrawer: renderClickableZoneDrawer,
  } = useDrawer(addEditClickableZoneDrawer);

  return (
    <div className="border flex justify-between rounded-lg p-2">
      <div className="w-full flex gap-3 flex-col">
        <div className="w-full flex gap-3">
          <Button
            isIconOnly={true}
            onPress={() =>
              !isLoading
                ? handleOpenClickableZoneDrawer({
                    storyId,
                    levelId,
                    clickableZoneId,
                  })
                : undefined
            }
          >
            <Pencil />
          </Button>
          <DeleteWithAutoHandleActionModal
            primaryAction={{
              onPress: handleRemoveClicableZone,
            }}
          >
            <Button isIconOnly={true}>
              <Trash2 />
            </Button>
          </DeleteWithAutoHandleActionModal>
        </div>
        {!isLoading && (
          <span className="text-base font-semibold">{clickableZone?.note}</span>
        )}
      </div>
      <Stage width={displayWidth} height={displayHeight}>
        <Layer>
          <Image width={displayWidth} height={displayHeight} image={image} />
          {clickableZones?.map((clZone) => {
            const isPrimaryZone = clickableZone?.id === clZone.id;
            return (
              <Circle
                key={clickableZoneId}
                clickableZoneId={clickableZone}
                isPrimaryZone={isPrimaryZone}
                draggable={false}
                displayWidth={displayWidth}
                displayHeight={displayHeight}
                clickableZone={clZone}
              />
            );
          })}
        </Layer>
      </Stage>
      {renderClickableZoneDrawer}
    </div>
  );
}
