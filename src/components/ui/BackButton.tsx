import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import clsx from 'clsx';

import { useGoBack } from '@/hooks/useGoBack';

export const BackButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function BackButton({ className, ...props }, ref) {
  const goBack = useGoBack();

  return (
    <button
      {...props}
      ref={ref}
      onClick={goBack}
      className={clsx(
        'cursor-pointer hover:shadow-[inset_0_-1px_0_currentColor]',
        className
      )}
    >
      Back
    </button>
  );
});
