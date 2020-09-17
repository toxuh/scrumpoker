import { useCallback } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

const useApp = () => {
  const socket = io.connect('http://localhost:3011');
  const localUserId = localStorage.getItem(LS_KEY) || '';

  const listenReload = useCallback(() => {
    socket.on('reload', () => {
      window.location.reload();
    });
  }, [socket]);

  return { listenReload, localUserId, socket };
};

export default useApp;
