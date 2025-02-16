import Uuid from '../_core/uuid';

type ClickableZoneId = Uuid & {
  __ClickableZone__: void;
};

type ClickableZone = {
  id: ClickableZoneId;
  x: number;
  y: number;
  radius: number;
  options: ClickableZoneOption[];
};

export default ClickableZone;
