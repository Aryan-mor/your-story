import { useEffect, useRef, useState } from 'react'; // note: for position "top" add -top-1 className for position "bottom" add -bottom-1 className to div

// note: for position "top" add -top-1 className for position "bottom" add -bottom-1 className to div
export default function useSticky() {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => (e ? setIsSticky(e.intersectionRatio < 1) : undefined),
      { threshold: [1] },
    );
    if (!cachedRef) return;
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref]);

  return { ref, isSticky };
}
