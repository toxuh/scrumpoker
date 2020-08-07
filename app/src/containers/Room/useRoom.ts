import { LS_KEY } from '../../constants';

const useRoom = () => {
  const userId = localStorage.getItem(LS_KEY);

  return { userId };
};

export default useRoom;
