'use client';

import { Stage, Layer, Circle, Image } from 'react-konva';
import useImage from 'use-image';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { imagePlaceholder } from '@/components/_core/imageUploader/ImageUploader';

type ChoseClickableZoneProps = {
  imageSrc: string | null | undefined;
  clickableZone: Pick<ClickableZone, 'options' | 'radius' | 'x' | 'y'>;
  onClickableZoneChange: (
    clicableZone: Pick<ClickableZone, 'options' | 'radius' | 'x' | 'y'>,
  ) => void;
};

export default function ChoseClickableZone({
  imageSrc,
  clickableZone,
  onClickableZoneChange,
}: ChoseClickableZoneProps) {
  const [image] = useImage(imageSrc ?? imagePlaceholder);

  const handleClick = (e: any) => {
    const stage = e.target.getStage();
    const pointer: CircleConfig = stage.getPointerPosition();
    onClickableZoneChange({
      ...clickableZone,
      x: Number(pointer.x?.toFixed(3)),
      y: Number(pointer.y?.toFixed(3)),
    });
  };

  return (
    <div>
      <Stage
        width={900 / 3}
        height={1600 / 3}
        onClick={handleClick}
        onDragEnd={handleClick}
      >
        <Layer>
          <Image width={900 / 3} height={1600 / 3} image={image} />
          <Circle
            {...clickableZone}
            fill="rgba(0,0,0,0.4)"
            draggable={true}
            stroke="rgba(255,255,255,0.8)"
          />
        </Layer>
      </Stage>
      <div>
        <input
          type="range"
          min="10"
          max="100"
          value={clickableZone.radius}
          onChange={(e) => {
            return onClickableZoneChange({
              ...clickableZone,
              radius: parseInt(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}
