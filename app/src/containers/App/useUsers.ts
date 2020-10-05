import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentUser, setUsersList } from './actions';

import { handleSocketListener, handleSocketRequest } from '../../api';
import {
  CONNECT_USER,
  DISCONNECT_USER,
  SET_MODERATOR_ROLE,
  USER_CONNECTED,
} from '../../constants/requests';

import { UserType } from '../../types';

const useUsers = (localUserId?: string) => {
  const dispatch = useDispatch();

  const connectUser = useCallback(() => {
    handleSocketRequest({
      type: CONNECT_USER,
      payload: localUserId,
    });
  }, [localUserId]);

  const listenUsers = useCallback(() => {
    handleSocketListener({
      type: USER_CONNECTED,
      callback: (users: UserType[]) => {
        const currentUser = users.find(
          (user) => user._id === localUserId,
        ) as UserType;

        if (currentUser) {
          dispatch(setCurrentUser(currentUser));
        }

        dispatch(setUsersList(users));
      },
    });
  }, [dispatch, localUserId]);

  const disconnectUser = useCallback((localUserId) => {
    handleSocketRequest({ type: DISCONNECT_USER, payload: localUserId });
  }, []);

  const moderatorRole = useCallback((localUserId) => {
    handleSocketRequest({ type: SET_MODERATOR_ROLE, payload: localUserId });
  }, []);

  return {
    connectUser,
    disconnectUser,
    listenUsers,
    moderatorRole,
  };
};

export default useUsers;
