import { type CSSProperties, type ReactNode } from 'react';

interface TitleDividerProps {
  children: ReactNode;
  botMargin?: CSSProperties['marginBottom'];
}

export function TitleDivider({ children, botMargin = 0 }: TitleDividerProps) {
  return (
    <div
      className="flex gap-4 items-center justify-center w-fit border border-green-300"
      style={{ marginBottom: botMargin }}
    >
      <span>--- </span>
      <h3>{children}</h3>
      <span> ---</span>
    </div>
  );
}
