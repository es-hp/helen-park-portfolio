import { useNavigate } from 'react-router-dom';

export function useGoBack() {
  const navigate = useNavigate();

  return function goBack() {
    if (window.history.length > 1) {
      void navigate(-1);
    } else {
      void navigate('/');
    }
  };
}
