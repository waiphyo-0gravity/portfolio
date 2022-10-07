import { useEffect, useMemo } from "react";
import { useImmer } from "use-immer";

export const useIsInViewport = (ref: any) => {
  const [isIntersecting, setIsIntersecting] = useImmer(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}