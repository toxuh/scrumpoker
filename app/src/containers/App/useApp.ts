import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

const useApp = () => {
  const socket = io.connect('http://localhost:3011');
  const localUserId = localStorage.getItem(LS_KEY) || '';

  return { localUserId, socket };
};

export default useApp;
