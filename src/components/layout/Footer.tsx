export const FOOTER_HEIGHT_REM: number = 4;

export function Footer({ heightRem }: { heightRem: number }) {
  return (
    <footer
      className="footer flex items-center justify-between w-full max-w-3xl px-(--app-layout-padding)"
      style={{ height: `${heightRem}rem` }}
    >
      <span>(c) 2026</span>
      <span>Helen Park</span>
      <span>es.helenpark@gmail.com</span>
    </footer>
  );
}
