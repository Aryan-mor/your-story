import ReactQueryHook from './_core/react-query-hook';
import { useCallback, useMemo } from 'react';
import { useLevel, useUpdateLevel } from './use-levels';
import ClickableZone from '../.history/types/clickableZone/clickableZone_20250222223138';
import CArray from '@/utils/cArray';
import { defaultClickableZone } from '@/types/clickableZone/clickableZone';
import { newUuid } from '@/types/_core/uuid';

const useClickableZoneQuery = (
  params:
    | { storyId: undefined | Story['id']; levelId: undefined | Level['id'] }
    | undefined,
) => {
  const { data: level, isLoading } = useLevel({
    id: params?.levelId,
    storyId: params?.storyId,
  });

  const data = useMemo(() => {
    return level?.clickableZone;
  }, [level?.clickableZone]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

export const useUpdateClickableZone = (params: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
}) => {
  const updateLevel = useUpdateLevel({ storyId: params?.storyId });
  const { data: level } = useLevel({
    storyId: params?.storyId,
    id: params?.levelId,
  });

  return useCallback(
    (clickableZone: Partial<ClickableZone>) => {
      if (!level) return;
      const newClickableZone = CArray.safeOverrideItem(level.clickableZone, {
        ...defaultClickableZone,
        ...clickableZone,
        id: clickableZone?.id ?? newUuid(),
      });

      const newLevel = {
        ...level,
        clickableZone: newClickableZone,
      };
      return updateLevel.mutateAsync(newLevel);
    },
    [level, updateLevel],
  );
};

export const useRemoveClickableZone = (params: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
}) => {
  const updateLevel = useUpdateLevel({ storyId: params?.storyId });
  const { data: level } = useLevel({
    storyId: params?.storyId,
    id: params?.levelId,
  });

  return useCallback(
    (clickableZoneId: ClickableZone['id']) => {
      if (!level) return;
      const newClickableZone = level.clickableZone.filter(
        (cz) => cz.id !== clickableZoneId,
      );

      const newLevel = {
        ...level,
        clickableZone: newClickableZone,
      };
      return updateLevel.mutateAsync(newLevel);
    },
    [level, updateLevel],
  );
};

export const {
  use: useClickableZones,
  useObjectify: useObjectifyClickableZones,
  useOne: useClickableZone,
} = ReactQueryHook(useClickableZoneQuery);
