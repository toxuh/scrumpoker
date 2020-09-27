import { useSelector } from 'react-redux';

import { currentUserSelector, usersListSelector } from '../App/selectors';

const useUsers = () => {
  const currentUser = useSelector(currentUserSelector);
  const users = useSelector(usersListSelector);

  return { currentUser, users };
};

export default useUsers;
