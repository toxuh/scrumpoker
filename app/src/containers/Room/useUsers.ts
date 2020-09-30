import { useSelector } from 'react-redux';

import { usersListSelector } from '../App/selectors';

import { UserType } from '../../types';

const useUsers = (currentUser: UserType) => {
  const users = useSelector(usersListSelector);

  const isCurrentUserModerator = currentUser.role === 'moderator';

  return { currentUser, isCurrentUserModerator, users };
};

export default useUsers;
