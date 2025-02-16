import type StoryBase from '../story';
import type LevelBase from '../level';
import type ClickableZoneBase from '../clickableZone/clickableZone';
import type ClickableZoneOptionBase from '../clickableZone/option.clickableZone';

declare global {
  type Story = StoryBase;
  type Level = LevelBase;
  type ClickableZone = ClickableZoneBase;
  type ClickableZoneOption = ClickableZoneOptionBase;
}
