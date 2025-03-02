'use client';

import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory } from '@/req/use-stories';
import Video from '@/components/_core/video/video';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function PlayStory() {
  const { storyId } = useParams();
  const { data: story } = useStory({ id: storyId });
  const router = useRouter();

  const handleIntroEnd = useCallback(() => {
    if (story?.startLevelId)
      router.push(`/game/stories/play/${storyId}/level/${story?.startLevelId}`);
  }, [router, story?.startLevelId, storyId]);

  return <Video video={story?.introAnimation} onEnded={handleIntroEnd} />;
}
