import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import Circle from '@/components/_core/konva/circle';
import { useClickableZones } from '@/req/use-clickable-zone';
import { useLevel } from '@/req/use-levels';
import { Layer, Stage, Image } from 'react-konva';
import useImage from 'use-image';

type ClickableZoneMultiPreviewProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  onZoneClick?: (clickableZoneId: ClickableZone['id']) => void;
};

const originalWidth = 900;
const originalHeight = 1600;

const displayWidth = originalWidth / 5;
const displayHeight = originalHeight / 5;

export default function MultiClickableZonePreview({
  levelId,
  storyId,
  onZoneClick,
}: ClickableZoneMultiPreviewProps) {
  const { data: level } = useLevel({ storyId, id: levelId });
  const { data: clickableZones } = useClickableZones({
    levelId,
    storyId,
  });

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  return (
    <div
      style={{
        cursor: onZoneClick ? 'default' : 'auto',
      }}
    >
      <Stage width={displayWidth} height={displayHeight}>
        <Layer>
          <Image width={displayWidth} height={displayHeight} image={image} />
          {clickableZones?.map((clickableZone) => (
            <Circle
              key={clickableZone.id}
              displayWidth={displayWidth}
              displayHeight={displayHeight}
              clickableZone={clickableZone}
              draggable={false}
              onClick={() => onZoneClick?.(clickableZone.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
