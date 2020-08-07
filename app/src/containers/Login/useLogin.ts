import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

import { UserResponseType } from '../../types';

const useLogin = (
  handleSetUserName: Dispatch<SetStateAction<UserResponseType>>,
) => {
  const socket = io.connect('http://localhost:3001');

  useEffect(() => {
    socket.on('user-saved', (user: UserResponseType) => {
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
