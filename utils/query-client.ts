import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attempt) =>
        Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 60_000),
      gcTime: 86_400_000,
      staleTime: Number.POSITIVE_INFINITY,
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (failureCount === 5) return false;
        try {
          const status =
            (
              error as {
                status: number;
              }
            ).status ?? 500;
          if (status === 401 || status >= 500 || status === 0) return true;
        } catch {
          /* empty */
        }
        return false;
      },
    },
  },
});

export default queryClient;
