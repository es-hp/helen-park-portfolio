import { useAppLayoutRefs } from '@/hooks/useAppLayoutRefs';

export const FOOTER_HEIGHT_REM: number = 4;

export function Footer() {
  const { footerRef } = useAppLayoutRefs();
  return (
    <footer
      ref={footerRef}
      className="footer flex items-center justify-between w-full h-frame max-w-3xl z-50 border border-blue-500"
    >
      <span>(c) 2026</span>
      <span>Helen Park</span>
      <span>es.helenpark@gmail.com</span>
    </footer>
  );
}
