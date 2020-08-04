import { useCallback } from 'react';
import axios from 'axios';

const useApp = () => {
  const LS_KEY = 'poker-user-id';

  const isLSExists = Boolean(localStorage.getItem(LS_KEY));

  const bootstrap = useCallback(async () => {
    const { data } = await axios.get(
      `/api/v1/users/?id=${localStorage.getItem(LS_KEY)}`,
    );

    return data;
  }, []);

  return { bootstrap, isLSExists };
};

export default useApp;
