'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // router.push('/admin');
    router.push('/game/stories/play/m9vbbcbtdfnk7zb006e');
  }, [router]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      test
    </section>
  );
}
