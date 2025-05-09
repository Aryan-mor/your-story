import Uuid from '../_core/uuid';

type ClickableZoneOptionId = Uuid & {
  __ClickableZoneOption__: void;
};

export enum ClickableZoneOptionLevelType {
  Failed = 'Failed',
  Success = 'Success',
}

type ClickableZoneOption = {
  id: ClickableZoneOptionId;
  text: string;
  nextLevelId: null | Level['id'];
  levelType: null | ClickableZoneOptionLevelType;
  transitionAnimation: null | Video;
};

export const defaultClickableZoneOption: Omit<ClickableZoneOption, 'id'> = {
  text: '',
  nextLevelId: null,
  levelType: null,
  transitionAnimation: null,
};

export default ClickableZoneOption;
