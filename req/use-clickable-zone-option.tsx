import ReactQueryHook from './_core/react-query-hook';
import { useCallback, useMemo } from 'react';
import { useLevel, useUpdateLevel } from './use-levels';
import ClickableZone from '../.history/types/clickableZone/clickableZone_20250222223138';
import CArray from '@/utils/cArray';
import { newUuid } from '@/types/_core/uuid';
import { useClickableZone } from './use-clickable-zone';
import ClickableZoneOption from '../.history/types/clickableZone/option.clickableZone_20250223112019';
import { defaultClickableZoneOption } from '@/types/clickableZone/option.clickableZone';

const useClickableZoneOptionQuery = (
  params:
    | {
        storyId: undefined | Story['id'];
        levelId: undefined | Level['id'];
        clickableZoneId: undefined | ClickableZone['id'];
      }
    | undefined,
) => {
  const { data: clickableZone, isLoading } = useClickableZone({
    id: params?.clickableZoneId,
    storyId: params?.storyId,
    levelId: params?.levelId,
  });

  const data = useMemo(() => {
    return clickableZone?.options;
  }, [clickableZone?.options]);

  return useMemo(() => ({ data, isLoading }), [data, isLoading]);
};

export const useUpdateClickableZoneOption = (params: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
}) => {
  const updateLevel = useUpdateLevel({ storyId: params?.storyId });
  const { data: level } = useLevel({
    storyId: params?.storyId,
    id: params?.levelId,
  });
  const { data: clickableZone } = useClickableZone({
    id: params?.clickableZoneId,
    levelId: params?.levelId,
    storyId: params?.storyId,
  });

  return useCallback(
    (clickableZoneOption: Partial<ClickableZoneOption>) => {
      if (!level || !params?.clickableZoneId || !clickableZone) return;
      const newClickableZone = CArray.safeOverrideItem(level.clickableZone, {
        ...clickableZone,
        options: CArray.safeOverrideItem(clickableZone.options, {
          ...defaultClickableZoneOption,
          ...clickableZoneOption,
          id: clickableZoneOption.id ?? newUuid(),
        }),
      });

      const newLevel = {
        ...level,
        clickableZone: newClickableZone,
      };
      return updateLevel.mutateAsync(newLevel);
    },
    [clickableZone, level, params?.clickableZoneId, updateLevel],
  );
};

export const useRemoveClickableZoneOption = (params: {
  storyId: undefined | Story['id'];
  levelId: undefined | Level['id'];
  clickableZoneId: undefined | ClickableZone['id'];
}) => {
  const updateLevel = useUpdateLevel({ storyId: params?.storyId });
  const { data: level } = useLevel({
    storyId: params?.storyId,
    id: params?.levelId,
  });
  const { data: clickableZone } = useClickableZone({
    id: params?.clickableZoneId,
    levelId: params?.levelId,
    storyId: params?.storyId,
  });

  return useCallback(
    (clickableZoneOptionId: ClickableZoneOption['id']) => {
      if (!level || !params?.clickableZoneId || !clickableZone) return;
      const newClickableZone = CArray.safeOverrideItem(level.clickableZone, {
        ...clickableZone,
        options: clickableZone.options?.filter(
          (o) => o.id !== clickableZoneOptionId,
        ),
      });

      const newLevel = {
        ...level,
        clickableZone: newClickableZone,
      };
      return updateLevel.mutateAsync(newLevel);
    },
    [clickableZone, level, params?.clickableZoneId, updateLevel],
  );
};

export const {
  use: useClicableZoneOptions,
  useObjectify: useObjectifyClicableZonesOptions,
  useOne: useClicableZoneOption,
} = ReactQueryHook(useClickableZoneOptionQuery);
