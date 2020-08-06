import { useCallback } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

const useRoom = () => {
  const socket = io.connect('http://localhost:3001');
  const userId = localStorage.getItem(LS_KEY);

  const handleUserConnected = useCallback(() => {
    socket.emit('connect-user', userId);
  }, [socket, userId]);

  return { handleUserConnected, socket };
};

export default useRoom;
