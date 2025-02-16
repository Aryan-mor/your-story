import Uuid from '../_core/uuid';

type ClickableZoneOptionId = Uuid & {
  __ClickableZoneOption__: void;
};

type ClickableZoneOption = {
  id: ClickableZoneOptionId;
  text: string;
  nextLevelId: Level['id'];
};

export default ClickableZoneOption;
