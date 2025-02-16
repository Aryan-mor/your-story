import Database, { DataType } from '@/app/api/database/database';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { pushErrorNotification } from './_core/error.ai';
import ReactQueryHook from './_core/react-query-hook';

const LevelsKey = DataType.Levels;
const useLevelsQuery = () => {
  return useQuery({
    queryKey: [LevelsKey],
    queryFn: () => {
      return Database.readData<Level[]>(LevelsKey).then((data) => data ?? []);
    },
  });
};

export const useUpdateLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (level: Level) => {
      return Database.upsertItem(LevelsKey, level);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LevelsKey] });
    },
    onError: pushErrorNotification,
  });
};

export const {
  use: useLevels,
  useObjectify: useObjectifyLevels,
  useOne: useLevel,
} = ReactQueryHook(useLevelsQuery);
