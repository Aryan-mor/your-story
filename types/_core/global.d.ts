import type ImageBase from './image';
import type VideoBase from './video';
import type StoryBase from '../story';
import type LevelBase from '../level';
import type ClickableZoneBase from '../clickableZone/clickableZone';
import type ClickableZoneOptionBase from '../clickableZone/option.clickableZone';

declare global {
  type Image = ImageBase;
  type Video = VideoBase;
  type Story = StoryBase;
  type Level = LevelBase;
  type ClickableZone = ClickableZoneBase;
  type ClickableZoneOption = ClickableZoneOptionBase;
}
