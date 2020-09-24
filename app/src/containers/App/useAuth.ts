import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { setCurrentUser } from './actions';
import { currentUserSelector } from './selectors';

import { UserType } from '../../types';
import { LS_KEY } from '../../constants';

const useAuth = (socket: typeof Socket) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);

  const registerUser = useCallback(
    (name: string) => {
      socket.emit('create-user', name);
    },
    [socket],
  );

  const listenUserRegistered = useCallback(() => {
    socket.on('user-saved', (user: UserType) => {
      localStorage.setItem(LS_KEY, user._id);
      dispatch(setCurrentUser(user));
    });
  }, [socket]);

  return { currentUser, listenUserRegistered, registerUser };
};

export default useAuth;
