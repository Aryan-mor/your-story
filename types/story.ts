import Uuid from './_core/uuid';

type StoryId = Uuid & {
  __Story__: void;
};

type Story = {
  id: StoryId;
  title: string;
  description: string;
  thumbnail: null | Image;
  startLevelId: null | Level['id'];
  levels: Level['id'][];
};

export const defaultStory: Partial<Story> = {
  title: '',
  description: '',
  thumbnail: null,
  startLevelId: null,
  levels: [],
};

export default Story;
