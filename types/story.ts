import Uuid from './_core/uuid';

type StoryId = Uuid & {
  __Story__: void;
};

type Story = {
  id: StoryId;
  title: string;
  description: string;
  thumbnail: string;
  startLevelId: Level['id'];
  levels: Level['id'][];
};

export default Story;
