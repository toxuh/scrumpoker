import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentUser, setUsersList } from './actions';
import { localUserId, usersListSelector } from './selectors';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { UserType } from '../../types';

const useUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector(usersListSelector);

  const connectUser = useCallback((localUserId) => {
    handleSocketRequest({
      type: 'connect-user',
      payload: localUserId,
    });
  }, []);

  const listenUsers = useCallback(() => {
    handleSocketListener({
      type: 'users-connected',
      callback: (users: UserType[]) => {
        const currentUser = users.find(
          (user) => user._id === localUserId,
        ) as UserType;

        dispatch(setUsersList(users));
        dispatch(setCurrentUser(currentUser));
      },
    });
  }, [dispatch]);

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
    users,
  };
};

export default useUsers;
