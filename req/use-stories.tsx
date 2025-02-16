import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactQueryHook from './_core/react-query-hook';
import { pushErrorNotification } from './_core/error.ai';

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (story: Partial<Story>) => {
      return fetch('/api/stories', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story),
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [StoriesKey] });
      return res;
    },
    onError: pushErrorNotification,
  });
};

export const {
  use: useStories,
  useObjectify: useObjectifyStories,
  useOne: useStory,
} = ReactQueryHook(useStoriesQuery);
