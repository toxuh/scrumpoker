import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';

import { LS_KEY } from '../../constants';

type UserCreateResponseTypes = {
  _id: string;
  name: string;
};

const useLogin = (handleSetUserName: Dispatch<SetStateAction<string>>) => {
  const socket = io.connect('http://localhost:3001');

  useEffect(() => {
    socket.on('user-saved', (user: UserCreateResponseTypes) => {
      localStorage.setItem(LS_KEY, user._id);

      handleSetUserName(user.name);
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
