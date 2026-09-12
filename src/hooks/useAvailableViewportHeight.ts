import { useLayoutEffect, useState } from 'react';

type ElementRef = {
  readonly current: HTMLElement | null;
};

type UseAvailableViewportHeightOptions = {
  headerRef: ElementRef;
  footerRef: ElementRef;
};
/**
 * Returns the visible viewport height minus
 * the current heights of the header and footer.
 *
 * @param headerRef - Ref to the fixed header element (0 if not mounted).
 * @param footerRef - Ref to the fixed footer element (0 if not mounted).
 */
export function useAvailableViewportHeight({
  headerRef,
  footerRef,
}: UseAvailableViewportHeightOptions): number {
  const [availableHeight, setAvailableHeight] = useState(0);

  useLayoutEffect(() => {
    let animationFrameId: number | null = null;

    const calculateHeight = () => {
      animationFrameId = null;

      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;

      const headerHeight =
        headerRef.current?.getBoundingClientRect().height ?? 0;

      const footerHeight =
        footerRef.current?.getBoundingClientRect().height ?? 0;

      const nextHeight = Math.max(
        0,
        viewportHeight - headerHeight - footerHeight
      );

      setAvailableHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight
      );
    };

    const scheduleCalculation = () => {
      if (animationFrameId !== null) return;
      animationFrameId = window.requestAnimationFrame(calculateHeight);
    };

    const resizeObserver = new ResizeObserver(scheduleCalculation);

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    window.addEventListener('resize', scheduleCalculation);
    window.visualViewport?.addEventListener('resize', scheduleCalculation);

    calculateHeight();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleCalculation);
      window.visualViewport?.removeEventListener('resize', scheduleCalculation);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [headerRef, footerRef]);

  return availableHeight;
}
