'use client';

import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import Circle from '@/components/_core/konva/circle';
import { useLevel } from '@/req/use-levels';
import Level from '../../../types/level';
import { KonvaEventObject } from 'konva/lib/Node';
import Button from '@/components/_core/button/button';
import CArray from '@/utils/cArray';
import useDrawer from '@/components/_core/drawer/use.drawer';
import AddEditOptionDrawer from '../option/add-edit.option.drawer';
import ClickableZonePreview from './preview.clickable-zone';
import ClickableZoneOption from '../../../.history/types/clickableZone/option.clickableZone_20250223112019';
import PreviewClickableZoneOption from '../option/preview.clickable-zone-option';

type ChoseClickableZoneProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  primaryClickableZone: undefined | ClickableZone;
  onClickableZoneChange: (clickableZone: ClickableZone) => void;
};
const originalWidth = 900;
const originalHeight = 1600;

export default function ChoseClickableZone({
  levelId,
  storyId,
  primaryClickableZone,
  onClickableZoneChange,
}: ChoseClickableZoneProps) {
  const { data: level } = useLevel({
    storyId,
    id: levelId,
  });
  const {
    renderDrawer: renderAddEditOptionDrawer,
    handleOpenDrawer: handleOpenAddEditOptionDrawer,
  } = useDrawer(AddEditOptionDrawer);

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  const displayWidth = originalWidth / 3;
  const displayHeight = originalHeight / 3;
  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = stage.getPointerPosition();
    if (!pointer || !primaryClickableZone) return;

    onClickableZoneChange({
      ...primaryClickableZone,
      x: (pointer.x / displayWidth) * 100,
      y: (pointer.y / displayHeight) * 100,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <Stage
          width={displayWidth}
          height={displayHeight}
          onClick={handleClick}
        >
          <Layer>
            <Image width={displayWidth} height={displayHeight} image={image} />
            {level?.clickableZone?.map((clz) => {
              const isPrimaryZone = clz.id === primaryClickableZone?.id;
              const clickableZone = isPrimaryZone ? primaryClickableZone : clz;
              return (
                <Circle
                  key={clickableZone.id}
                  clickableZone={clickableZone}
                  displayWidth={displayWidth}
                  displayHeight={displayHeight}
                  isPrimaryZone={isPrimaryZone}
                  draggable={isPrimaryZone}
                  onDragMove={(e: KonvaEventObject<DragEvent>) => {
                    if (primaryClickableZone)
                      onClickableZoneChange({
                        ...primaryClickableZone,
                        x: (e.target.x() / displayWidth) * 100,
                        y: (e.target.y() / displayHeight) * 100,
                      });
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
        <div>
          <input
            type="range"
            min="5"
            max="50"
            value={primaryClickableZone?.radius}
            onChange={(e) => {
              if (primaryClickableZone)
                onClickableZoneChange({
                  ...primaryClickableZone,
                  radius: parseFloat(e.target.value),
                });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">Options:</span>
        {primaryClickableZone?.options.map((option) => (
          <PreviewClickableZoneOption
            key={option?.id}
            levelId={levelId}
            storyId={storyId}
            clickableZoneId={primaryClickableZone?.id}
            clickableZoneOption={option}
          />
        ))}
        {CArray.isEmpty(primaryClickableZone?.options) && (
          <span className="text-gray-600 text-sm">No option avaible</span>
        )}
        <div className="flex">
          <Button
            onPress={() =>
              handleOpenAddEditOptionDrawer({
                storyId,
                levelId,
                clickableZoneId: primaryClickableZone?.id,
              })
            }
          >
            Add option
          </Button>
        </div>
      </div>
      {renderAddEditOptionDrawer}
    </div>
  );
}
