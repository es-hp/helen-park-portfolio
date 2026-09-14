import { type RefObject, useLayoutEffect, useState } from 'react';

export function useElementHeight<T extends HTMLElement>(
  ref: RefObject<T | null>
): number | undefined {
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateHeight = () => {
      setHeight(element.clientHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return height;
}
