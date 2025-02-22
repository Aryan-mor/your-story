import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQueryHook from './_core/react-query-hook';
import { pushErrorNotification } from './_core/error.ai';
import { defaultStory } from '@/types/story';
import { useCallback } from 'react';

const StoriesKey = 'stories';
const useStoriesQuery = () => {
  return useQuery({
    queryKey: [StoriesKey],
    queryFn: () => {
      return fetch('/api/stories')
        .then((res) => res.json())
        .then((data) => (data ?? []) as Story[]);
    },
  });
};

export const useUpdateStory = () => {
  const refchStories = useRefchStories();
  const { data: stories } = useObjectifyStories();

  return useMutation({
    mutationFn: (story: Partial<Story>) => {
      const baseStory =
        (story?.id ? stories?.[story.id] : undefined) ?? defaultStory;
      const saveStory: Partial<Story> = {
        ...baseStory,
        ...story,
        levels: story.levels ?? baseStory?.levels ?? [],
      };
      return fetch('/api/stories', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveStory),
      });
    },
    onSuccess: (res) => {
      refchStories();
      return res;
    },
    onError: pushErrorNotification,
  });
};

export function useRefchStories() {
  const queryClient = useQueryClient();
  return useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [StoriesKey] });
  }, [queryClient]);
}

export const {
  use: useStories,
  useObjectify: useObjectifyStories,
  useOne: useStory,
} = ReactQueryHook(useStoriesQuery);
