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
    >
      Back
    </button>
  );
}
