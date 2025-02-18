import Uuid from './_core/uuid';

type LevelId = Uuid & {
  __Level__: void;
};

type Level = {
  id: LevelId;
  title: string;
  image: Image;
  transitionAnimation: Video;
  clickableZone: ClickableZone[];
};
export default Level;
