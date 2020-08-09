import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserType } from '../../types';

const useUsers = (socket: typeof Socket) => {
  const [users, setUser] = useState<UserType[]>([]);

  const listenUsers = useCallback(() => {
    socket.on('users-connected', (users: UserType[]) => {
      setUser(users);
    });
  }, []);

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

  return { connectUser, disconnectUser, listenUsers, users };
};

export default useUsers;
