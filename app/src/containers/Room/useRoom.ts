import { useCallback, useEffect } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

type UserConnectedResponseTypes = {
  _id: string;
  name: string;
};

const useRoom = () => {
  const socket = io.connect('http://localhost:3001');
  const userId = localStorage.getItem(LS_KEY);

  useEffect(() => {
    socket.on('user-connected', (user: UserConnectedResponseTypes) => {
      alert(user.name + ' connected!');
    });
  });

  const handleUserConnected = useCallback(() => {
    socket.emit('connect-user', userId);
  }, [socket, userId]);

  return { handleUserConnected };
};

export default useRoom;
