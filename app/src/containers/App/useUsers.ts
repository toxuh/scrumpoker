/* eslint-disable */
import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserType } from '../../types';
import { LS_KEY } from '../../constants';

const useUsers = (socket: typeof Socket) => {
  const [users, setUser] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>({} as UserType);

  const connectUser = useCallback(
    (localUserId) => {
      socket.emit('connect-user', localUserId);
    },
    [socket],
  );

  const listenUserRegistered = useCallback(() => {
    socket.on('user-saved', (user: UserType) => {
      localStorage.setItem(LS_KEY, user._id);
      location.reload();
    });
  }, [socket]);

  const listenUsers = useCallback(
    (localUserId) => {
      socket.on('users-connected', (users: UserType[]) => {
        setUser(users);
        setCurrentUser(
          users.find((user) => user._id === localUserId) as UserType,
        );
      });
    },
    [socket],
  );

  const registerUser = useCallback(
    (name: string) => {
      socket.emit('create-user', name);
    },
    [socket],
  );

  const disconnectUser = useCallback(
    (localUserId) => {
      socket.emit('disconnect-user', localUserId);
    },
    [socket],
  );

  return {
    connectUser,
    currentUser,
    disconnectUser,
    listenUserRegistered,
    listenUsers,
    registerUser,
    users,
  };
};

export default useUsers;
