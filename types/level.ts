import Uuid from './_core/uuid';

type LevelId = Uuid & {
  __Level__: void;
};

type Level = {
  id: LevelId;
  title: string;
  image: null | Image;
  clickableZone: ClickableZone[];
};
export default Level;

export const defaultLevel: Partial<Level> = {
  title: '',
  clickableZone: [],
  image: null,
};
