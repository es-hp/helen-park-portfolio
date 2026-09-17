import type { ComponentPropsWithoutRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function BackButton(props: ComponentPropsWithoutRef<'button'>) {
  const navigate = useNavigate();

  return (
    <button
      {...props}
      onClick={() => {
        if (window.history.length > 1) {
          void navigate(-1);
        } else {
          void navigate('/');
        }
      }}
      className="cursor-pointer hover:shadow-[inset_0_-1px_0_currentColor]"
    >
      Back
    </button>
  );
}
