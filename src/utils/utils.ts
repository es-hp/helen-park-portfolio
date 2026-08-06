import { type RefObject, useLayoutEffect, useRef, useState } from 'react';

export const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useElementWidth = <T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  width: number;
} => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
};
