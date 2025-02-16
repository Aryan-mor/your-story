'use client';

import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory } from '@/req/use-stories';

export default function StoryEdit() {
  const { storyId } = useParams();
  const { data: story, isLoading } = useStory({
    id: storyId,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (!story) return <h1>Page not found</h1>;
  return <h1>Edit Story {story.title}</h1>;
}
