import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

import { UserType } from '../../types';

const useLogin = (handleSetUserName: Dispatch<SetStateAction<UserType>>) => {
  const socket = io.connect('http://localhost:3001');

  useEffect(() => {
    socket.on('user-saved', (user: UserType) => {
      localStorage.setItem(LS_KEY, user._id);

      handleSetUserName(user);
    });
  });

  const createUser = useCallback(
    (userName) => {
      socket.emit('create-user', userName);
    },
    [socket],
  );

  return { createUser };
};

export default useLogin;
