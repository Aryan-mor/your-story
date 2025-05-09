import Uuid from './_core/uuid';

type LevelId = Uuid & {
  __Level__: void;
};

type Level = {
  id: LevelId;
  title: string;
  image: null | Image;
  clickableZones: ClickableZone[];
};
export default Level;

export const defaultLevel: Partial<Level> = {
  title: '',
  clickableZones: [],
  image: null,
};
