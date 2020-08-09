import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserType } from '../../types';

const useUsers = (socket: typeof Socket) => {
  const [users, setUser] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserType>({} as UserType);

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

  const connectUser = useCallback(
    (localUserId) => {
      socket.emit('connect-user', localUserId);
    },
    [socket],
  );

  const disconnectUser = useCallback(
    (localUserId) => {
      socket.emit('disconnect-user', localUserId);
    },
    [socket],
  );

  return { connectUser, currentUser, disconnectUser, listenUsers, users };
};

export default useUsers;
