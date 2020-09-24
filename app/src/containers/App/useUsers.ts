import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { bootstrapDone, setCurrentUser, setUsersList } from './actions';
import { localUserId, usersListSelector } from './selectors';

import { UserType } from '../../types';

const useUsers = (socket: typeof Socket) => {
  const dispatch = useDispatch();

  const users = useSelector(usersListSelector);

  const connectUser = useCallback(
    (localUserId) => {
      socket.emit('connect-user', localUserId);
    },
    [socket],
  );

  const listenUsers = useCallback(() => {
    socket.on('users-connected', (users: UserType[]) => {
      const currentUser = users.find(
        (user) => user._id === localUserId,
      ) as UserType;

      dispatch(setUsersList(users));
      dispatch(setCurrentUser(currentUser));
    });
  }, [socket]);

  const disconnectUser = useCallback(
    (localUserId) => {
      socket.emit('disconnect-user', localUserId);
    },
    [socket],
  );

  const moderatorRole = useCallback(
    (localUserId) => {
      socket.emit('moderator-role', localUserId);
    },
    [socket],
  );

  return {
    connectUser,
    disconnectUser,
    listenUsers,
    moderatorRole,
    users,
  };
};

export default useUsers;
