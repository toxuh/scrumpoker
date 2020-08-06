import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

import { UserResponseType } from '../../types';

const useApp = (setUserName: Dispatch<SetStateAction<string>>) => {
  const socket = io.connect('http://localhost:3001');
  const localUserId = localStorage.getItem(LS_KEY);

  const getUserName = useCallback(() => {
    socket.emit('get-user-name', localUserId);
  }, [localUserId, socket]);

  useEffect(() => {
    socket.on('user-name', (userName: UserResponseType) => {
      setUserName(userName.name);
    });
  });

  return { getUserName, isLSExists: Boolean(localUserId) };
};

export default useApp;
