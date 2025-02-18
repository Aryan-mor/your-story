import Uuid from './_core/uuid';

type StoryId = Uuid & {
  __Story__: void;
};

type Story = {
  id: StoryId;
  title: string;
  description: string;
  thumbnail: Image;
  startLevelId: Level['id'];
  levels: Level['id'][];
};

export const defaultStory: Partial<Story> = {
  title: '',
  description: '',
  levels: [],
};

export default Story;
