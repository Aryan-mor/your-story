'use client';

import useParams from '@/components/_core/_use/use-params/use-params';
import { useStory } from '@/req/use-stories';
import Image from '@/components/_core/image/image';
import { useOpen } from '@/utils/use-open';
import { Fragment, useCallback, useEffect } from 'react';
import Button from '@/components/_core/button/button';
import { useRouter } from 'next/navigation';

export default function PlayStory() {
  const { storyId } = useParams();
  const { data: story } = useStory({ id: storyId });
  const { isOpen: isShowAction, onOpen: onOpenActions } = useOpen();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      onOpenActions();
    }, 3500);
  }, [onOpenActions]);

  const navigateToStart = useCallback(() => {
    router.push(`/game/stories/play/${storyId}`);
  }, [router, storyId]);

  return (
    <Fragment>
      <Image src={story?.outroImage?.secure_url} />
      {isShowAction && (
        <div className="absolute top-0 bottom-0 right-0 left-0 p-4 gap-5  flex-col flex justify-end items-center">
          <div className="w-full p-7 flex justify-center items-center bg-gray-800/70">
            <Button onPress={navigateToStart} variant="solid" color="primary">
              برگشت به اول داستان
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
