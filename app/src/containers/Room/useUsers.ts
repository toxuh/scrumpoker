import { useSelector } from 'react-redux';

import { usersListSelector } from './selectors';

import { currentUserSelector } from '../App/selectors';

const useUsers = () => {
  const currentUser = useSelector(currentUserSelector);
  const users = useSelector(usersListSelector);

  const isCurrentUserModerator = currentUser.role === 'moderator';

  return { currentUser, isCurrentUserModerator, users };
};

export default useUsers;
