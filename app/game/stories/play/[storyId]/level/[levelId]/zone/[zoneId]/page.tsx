'use client';
import useParams from '@/components/_core/_use/use-params/use-params';
import { useClickableZone } from '@/req/use-clickable-zone';
import { useLevel } from '@/req/use-levels';
import Image from '@/components/_core/image/image';
import { tw } from '@/utils/tw';
import isRTL from '@/utils/is-rtl';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Video from '@/components/_core/video/video';
import { ClickableZoneOptionLevelType } from '@/types/clickableZone/option.clickableZone';
import { useOpen } from '@/utils/use-open';
import Button from '@/components/_core/button/button';
import CArray from '@/utils/cArray';

export default function PlayZone() {
  const router = useRouter();
  const { storyId, levelId, zoneId } = useParams();
  const { data: level } = useLevel({ storyId, id: levelId });
  const { data: clickableZone } = useClickableZone({
    storyId,
    levelId,
    id: zoneId,
  });
  const [selectedOption, setSelectedOption] = useState<
    ClickableZoneOption | undefined
  >(undefined);
  const {
    isOpen: isShowFiledLayout,
    onOpen: onShowFiledLayout,
    onClose: onHideFiledLayout,
  } = useOpen();

  const handleOptionClicked = useCallback(
    (option: ClickableZoneOption) => () => setSelectedOption(option),
    [],
  );

  const navigateToNextLevel = useCallback(() => {
    onHideFiledLayout();
    router.push(
      `/game/stories/play/${storyId}/level/${selectedOption?.nextLevelId + ''}`,
    );
    setSelectedOption(undefined);
  }, [onHideFiledLayout, router, selectedOption?.nextLevelId, storyId]);

  const handleOptionTransitionAnimationEnded = useCallback(() => {
    if (selectedOption?.levelType === ClickableZoneOptionLevelType.Failed) {
      onShowFiledLayout();
      return;
    }
    if (selectedOption?.levelType === ClickableZoneOptionLevelType.Success) {
      router.push(`/game/stories/play/${storyId}/finished`);
      return;
    }
    navigateToNextLevel();
  }, [
    navigateToNextLevel,
    onShowFiledLayout,
    router,
    selectedOption?.levelType,
    storyId,
  ]);

  useEffect(() => {
    if (clickableZone?.options?.length === 1) {
      handleOptionClicked(clickableZone.options[0])();
    }
  }, [clickableZone?.options, handleOptionClicked]);

  if (selectedOption)
    return (
      <Fragment>
        <Video
          video={selectedOption.transitionAnimation}
          onEnded={handleOptionTransitionAnimationEnded}
        />
        {isShowFiledLayout && (
          <div className="absolute top-0 bottom-0 right-0 left-0 p-4 gap-5 bg-gray-800/70 flex-col flex justify-center items-center">
            <span className="text-xl text-gray-50">
              😝 گزینه اشتباهی رو انتخاب کردی
            </span>
            <Button
              onPress={navigateToNextLevel}
              variant="solid"
              color="primary"
            >
              برگشت به عقب
            </Button>
          </div>
        )}
      </Fragment>
    );

  return (
    <div className="w-full h-full relative">
      <Image src={level?.image?.secure_url} />
      {(clickableZone?.options?.length ?? 0) > 1 && (
        <div className="flex flex-col gap-3 p-3 mb-8 absolute bottom-0 z-50 left-0 right-0">
          <div className="flex justify-center items-center">
            <span className="bg-gray-800/60 rounded-lg p-2 max-w-[80%] font-semibold text-xl mb-2 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              {level?.title}
            </span>
          </div>
          {CArray.shuffle(clickableZone?.options ?? [])?.map((option) => (
            <div
              dir={isRTL(option.text) ? 'rtl' : 'ltr'}
              key={option?.id}
              onClick={handleOptionClicked(option)}
              className={tw(
                'cursor-pointer bg-gray-800/70 hover:bg-gray-800/90 transition-all duration-200 border',
                'text-lg border-gray-300 rounded-lg p-3 text-gray-300',
              )}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
