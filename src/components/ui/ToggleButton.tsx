import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ToggleButtonProps = ComponentPropsWithoutRef<'button'> & {
  children: ReactNode;
  handleClick: () => void;
};

export function ToggleButton({
  children,
  handleClick,
  ...buttonProps
}: ToggleButtonProps) {
  return (
    <button
      {...buttonProps}
      type="button"
      className="w-full min-w-30 max-w-80 px-4 py-2 rounded-md bg-gray-300 opacity-80 hover:opacity-100 transition-opacity duration-100 ease-in-out whitespace-nowrap overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
