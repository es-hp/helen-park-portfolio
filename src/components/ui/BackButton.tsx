import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
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
