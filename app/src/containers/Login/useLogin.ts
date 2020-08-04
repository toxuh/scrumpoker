import { useCallback } from 'react';
import axios from 'axios';

import { LS_KEY } from '../../constants';

const useLogin = () => {
  const regUser = useCallback(async (name) => {
    const { data } = await axios.post('/api/v1/users/', { name });

    if (data.status === 'ok') {
      localStorage.setItem(LS_KEY, data.user._id);
    }
  }, []);

  return { regUser };
};

export default useLogin;
