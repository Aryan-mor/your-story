'use client';

import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import Circle from '@/components/_core/konva/circle';
import { useLevel } from '@/req/use-levels';
import Level from '../../../types/level';
import { useClicableZone } from '@/req/use-clickable-zone';

type ChoseClickableZoneProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  primaryClickableZoneId: undefined | ClickableZone['id'];
  onClickableZoneChange: (clickableZone: ClickableZone) => void;
};
const originalWidth = 900;
const originalHeight = 1600;

export default function ChoseClickableZone({
  levelId,
  storyId,
  primaryClickableZoneId,
  onClickableZoneChange,
}: ChoseClickableZoneProps) {
  const { data: level } = useLevel({
    storyId,
    id: levelId,
  });

  const { data: primaryClickableZone } = useClicableZone({
    id: primaryClickableZoneId,
    storyId,
    levelId,
  });

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  const displayWidth = originalWidth / 3;
  const displayHeight = originalHeight / 3;

  const handleClick = (e: any) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    if (!pointer || !primaryClickableZone) return;

    onClickableZoneChange({
      ...primaryClickableZone,
      x: (pointer.x / displayWidth) * 100,
      y: (pointer.y / displayHeight) * 100,
    });
  };

  return (
    <div>
      <Stage width={displayWidth} height={displayHeight} onClick={handleClick}>
        <Layer>
          <Image width={displayWidth} height={displayHeight} image={image} />
          {level?.clickableZone?.map((clz) => {
            const isPrimaryZone = clz.id === primaryClickableZoneId;
            return (
              <Circle
                key={clz.id}
                clickableZone={clz}
                displayWidth={displayWidth}
                displayHeight={displayHeight}
                isPrimaryZone={isPrimaryZone}
                draggable={isPrimaryZone}
                onDragMove={(e) => {
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
  );
}
