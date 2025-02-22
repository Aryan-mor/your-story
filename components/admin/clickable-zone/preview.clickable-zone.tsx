import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';
import { useClicableZone as useClickableZone } from '@/req/use-clickable-zone';
import { useLevel } from '@/req/use-levels';
import { Layer, Stage, Image, Circle } from 'react-konva';
import useImage from 'use-image';

type ClickableZonePreviewProps = {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
};

const imageWidth = 900 / 5;
const imageHeight = 1600 / 5;

export default function ClickableZonePreview({
  levelId,
  clickableZoneId,
  storyId,
}: ClickableZonePreviewProps) {
  const { data: level } = useLevel({
    storyId,
    id: levelId,
  });
  const { data: clickableZone } = useClickableZone({
    levelId,
    storyId,
    id: clickableZoneId,
  });

  const [image] = useImage(level?.image?.secure_url ?? imagePlaceholder);

  return (
    <div>
      <Stage width={imageWidth} height={imageHeight}>
        <Layer>
          <Image width={imageWidth} height={imageHeight} image={image} />
          <Circle
            {...clickableZone}
            fill="rgba(0,0,0,0.4)"
            draggable={false}
            stroke="rgba(255,255,255,0.8)"
          />
        </Layer>
      </Stage>
    </div>
  );
}
