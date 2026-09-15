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

/** Takes rem string value and converts it to px value as string.
 * Requires the DOM. Use only in useEffect or browser-only function.
 */
export const remToPx = (value: string): string | null => {
  const rem = Number.parseFloat(value);

  const rootFontSize = Number.parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  if (!Number.isFinite(rem) || !Number.isFinite(rootFontSize)) {
    return null;
  }

  return `${rem * rootFontSize}px`;
};

type CSSVariableValue =
  | string
  | {
      value: number;
      unit: string;
    };

/**
 * Gets the computed value of a CSS custom property.
 *
 * @returns {{ value: number; unit: string } | string}
 * An object containing the numeric value and unit when the value is a simple
 * CSS dimension; otherwise, the complete value as a string.
 */
export const getCSSVariableValue = (
  variable: `--${string}`,
  el: HTMLElement = document.documentElement
): CSSVariableValue => {
  const value = getComputedStyle(el).getPropertyValue(variable).trim();

  const match = value.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))([a-zA-Z]+|%)$/);

  if (!match) {
    return value;
  }

  const [, numericValue, unit] = match;
  return {
    value: Number(numericValue),
    unit,
  };
};
