'use client';

import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory } from '@/req/use-stories';
import Video from '@/components/_core/video/video';
import { useCallback } from 'react';
import usePrefetchAndNavigate from '@/utils/use-prefetch-and-navigate';

export default function PlayStory() {
  const { storyId } = useParams();
  const { data: story } = useStory({ id: storyId });
  const navigateToStartLevel = usePrefetchAndNavigate(
    storyId && story
      ? `/game/stories/play/${storyId}/level/${story.startLevelId}`
      : undefined,
  );
  const handleIntroEnd = useCallback(() => {
    if (story?.startLevelId) navigateToStartLevel();
  }, [navigateToStartLevel, story?.startLevelId]);

  return <Video video={story?.introAnimation} onEnded={handleIntroEnd} />;
}
