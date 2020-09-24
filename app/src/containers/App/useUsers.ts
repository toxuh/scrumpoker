import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { setUsersList } from './actions';
import { currentUserSelector, usersListSelector } from './selectors';

import { UserType } from '../../types';
import { LS_KEY } from '../../constants';

const useUsers = (socket: typeof Socket) => {
  const dispatch = useDispatch();

  const users = useSelector(usersListSelector);
  const currentUser = useSelector(currentUserSelector);

  const connectUser = useCallback(
    (localUserId) => {
      socket.emit('connect-user', localUserId);
    },
    [socket],
  );

  const listenUserRegistered = useCallback(() => {
    socket.on('user-saved', (user: UserType) => {
      localStorage.setItem(LS_KEY, user._id);
      window.location.reload();
    });
  }, [socket]);

  const listenUsers = useCallback(() => {
    socket.on('users-connected', (users: UserType[]) => {
      dispatch(setUsersList(users));
    });
  }, [socket]);

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

  const moderatorRole = useCallback(
    (localUserId) => {
      socket.emit('moderator-role', localUserId);
    },
    [socket],
  );

  return {
    connectUser,
    currentUser,
    disconnectUser,
    listenUserRegistered,
    listenUsers,
    moderatorRole,
    registerUser,
    users,
  };
};

export default useUsers;
