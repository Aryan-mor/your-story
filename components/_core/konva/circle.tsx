import { CircleConfig } from 'konva/lib/shapes/Circle';
import { Circle as KonvaCircle } from 'react-konva';

export default function Circle({
  clickableZone,
  displayWidth,
  displayHeight,
  isPrimaryZone,
  draggable,
  onClick,
  ...props
}: {
  clickableZone: ClickableZone;
  displayWidth: number;
  displayHeight: number;
  isPrimaryZone?: boolean;
} & CircleConfig) {
  return (
    <KonvaCircle
      x={(clickableZone.x / 100) * displayWidth}
      y={(clickableZone.y / 100) * displayHeight}
      radius={(clickableZone.radius / 100) * displayWidth}
      fill={isPrimaryZone ? 'rgba(49, 247, 53,.6)' : 'rgba(0,0,0,0.2)'}
      stroke={
        isPrimaryZone ? 'rgba(31, 148, 33, 0.6)' : 'rgba(255,255,255,0.2)'
      }
      draggable={draggable}
      onMouseEnter={
        draggable || onClick
          ? (e) => {
              const stage = e.target.getStage();
              if (stage) stage.container().style.cursor = 'pointer';
            }
          : undefined
      }
      onMouseLeave={
        draggable || onClick
          ? (e) => {
              const stage = e.target.getStage();
              if (stage) stage.container().style.cursor = 'default';
            }
          : undefined
      }
      {...props}
    />
  );
}
