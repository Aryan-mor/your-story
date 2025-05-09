import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function usePrefetchAndNavigate(href: string | undefined) {
  const router = useRouter();

  useEffect(() => {
    if (href) router.prefetch(href);
  }, [href, router]);

  return useCallback(() => {
    if (href) router.push(href);
  }, [href, router]);
}
