import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setCurrentUser, setUsersList } from './actions';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { UserType } from '../../types';

const useUsers = (localUserId?: string) => {
  const dispatch = useDispatch();

  const connectUser = useCallback(() => {
    handleSocketRequest({
      type: 'connect-user',
      payload: localUserId,
    });
  }, [localUserId]);

  const listenUsers = useCallback(() => {
    handleSocketListener({
      type: 'users-connected',
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
    handleSocketRequest({ type: 'disconnect-user', payload: localUserId });
  }, []);

  const moderatorRole = useCallback((localUserId) => {
    handleSocketRequest({ type: 'moderator-role', payload: localUserId });
  }, []);

  return {
    connectUser,
    disconnectUser,
    listenUsers,
    moderatorRole,
  };
};

export default useUsers;
