import { useEffect, useRef } from "react";

interface UseIntersectionObserverParams {
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect: (isIntersecting: boolean) => void;
}

const useIntersectionObserver = <T extends Element>({
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
}: UseIntersectionObserverParams) => {
  const rootRef = useRef<T>(null);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (entry) {
        onIntersect(entry.isIntersecting);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: rootRef.current,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [rootMargin, threshold, onIntersect]);

  return { rootRef, targetRef };
};

export default useIntersectionObserver;
