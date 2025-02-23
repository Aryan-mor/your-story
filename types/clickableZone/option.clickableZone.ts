import Uuid from '../_core/uuid';

type ClickableZoneOptionId = Uuid & {
  __ClickableZoneOption__: void;
};

type ClickableZoneOption = {
  id: ClickableZoneOptionId;
  text: string;
  nextLevelId: null | Level['id'];
  transitionAnimation: null | Video;
};

export const defaultClickableZoneOption: Omit<ClickableZoneOption, 'id'> = {
  text: '',
  nextLevelId: null,
  transitionAnimation: null,
};

export default ClickableZoneOption;
