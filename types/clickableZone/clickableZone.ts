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
  note: string;
};

export const defaultClickableZone: Omit<ClickableZone, 'id'> = {
  x: 5,
  y: 5,
  radius: 50,
  options: [],
  note: '',
};

export default ClickableZone;
