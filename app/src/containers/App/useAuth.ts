import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentUser } from './actions';
import { currentUserSelector } from './selectors';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { UserType } from '../../types';
import { LS_KEY } from '../../constants';

const useAuth = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);

  const registerUser = useCallback(
    (name: string) => {
      handleSocketRequest({
        type: 'create-user',
        payload: name,
      });
    },
    [handleSocketRequest],
  );

  const listenUserRegistered = useCallback(() => {
    handleSocketListener({
      type: 'user-saved',
      callback: (user: UserType) => {
        localStorage.setItem(LS_KEY, user._id);
        dispatch(setCurrentUser(user));
      },
    });
  }, [handleSocketListener]);

  return { currentUser, listenUserRegistered, registerUser };
};

export default useAuth;
