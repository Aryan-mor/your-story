'use client';
import useParams from '@/components/_core/_use/use-params/use-params';
import { useLevel } from '@/req/use-levels';
import Image from '@/components/_core/image/image';
import { useOpen } from '@/utils/use-open';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlayLevel() {
  const { storyId, levelId } = useParams();
  const { data: level } = useLevel({ storyId: storyId, id: levelId });
  const { isOpen: isLoaded, onOpen: onLoaded } = useOpen();
  const router = useRouter();
  useEffect(() => {
    if (
      (isLoaded || (level && !level.image)) &&
      level &&
      level.clickableZones.length === 1
    ) {
      router.push(
        `/game/stories/play/${storyId}/level/${levelId}/zone/${level.clickableZones[0].id}`,
      );
    }
  }, [isLoaded, level, levelId, router, storyId]);

  return <Image onLoad={onLoaded} src={level?.image?.secure_url} />;
}
