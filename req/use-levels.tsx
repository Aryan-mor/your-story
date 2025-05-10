import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQueryHook from './_core/react-query-hook';
import { pushErrorNotification } from './_core/error.ai';
import { defaultLevel } from '@/types/level';
import { useRefchStories } from './use-stories';

const LevelsKey = 'levels';
const useLevelsQuery = (
  params: { storyId: undefined | Story['id'] } | undefined,
) => {
  return useQuery({
    queryKey: [LevelsKey, params?.storyId],
    queryFn: () => {
      return fetch(`/api/levels/${params?.storyId}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return (data ?? []) as Level[];
        });
    },
    enabled: !!params?.storyId,
  });
};

export const useUpdateLevel = (params: {
  storyId: undefined | Story['id'];
}) => {
  const queryClient = useQueryClient();
  const { data: levels } = useObjectifyLevels({ storyId: params?.storyId });

  const refchStories = useRefchStories();

  return useMutation({
    mutationFn: (level: Partial<Level>) => {
      const baseLevel =
        (level?.id ? levels?.[level.id] : undefined) ?? defaultLevel;
      const saveLevel: Partial<Level> = {
        ...baseLevel,
        ...level,
      };
      return fetch(`/api/levels/${params?.storyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveLevel),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return { story: res.story } as { story: Story };
        });
    },
    onSuccess: (res: { story: Story }) => {
      queryClient.invalidateQueries({ queryKey: [LevelsKey, res.story.id] });
      refchStories();
      return res;
    },
    onError: pushErrorNotification,
  });
};

export const useRemoveLevel = (params: {
  storyId: undefined | Story['id'];
}) => {
  const queryClient = useQueryClient();
  const refchStories = useRefchStories();

  return useMutation({
    mutationFn: (levelId: Level['id']) => {
      return fetch(`/api/levels/${params?.storyId}/${levelId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: (res, levelId) => {
      queryClient.invalidateQueries({ queryKey: [LevelsKey, levelId] });
      refchStories();
      return res;
    },
    onError: pushErrorNotification,
  });
};

export const {
  use: useLevels,
  useObjectify: useObjectifyLevels,
  useOne: useLevel,
} = ReactQueryHook(useLevelsQuery);
