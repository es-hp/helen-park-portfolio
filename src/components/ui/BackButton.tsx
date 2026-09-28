import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';

export const BackButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function BackButton({ className, ...props }, ref) {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      ref={ref}
      onClick={() => {
        if (window.history.length > 1) {
          void navigate(-1);
        } else {
          void navigate('/');
        }
      }}
      className={clsx(
        'cursor-pointer hover:shadow-[inset_0_-1px_0_currentColor]',
        className
      )}
    >
      Back
    </button>
  );
});
