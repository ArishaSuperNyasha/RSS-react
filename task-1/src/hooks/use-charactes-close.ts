import { useLocation, useNavigate } from 'react-router-dom';

export function useCharactersClose(): {
  closeCharacters: () => void;
} {
  const params = useLocation();
  const navigate = useNavigate();

  const closeCharacters = () => {
    const path = params.pathname;
    const newPath = path.replace(/\/characters.*/, '');
    navigate(newPath);
  };

  return { closeCharacters };
}
