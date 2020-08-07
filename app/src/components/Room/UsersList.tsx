import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { UserResponseType } from '../../types';

type UsersListProps = {
  currentUser: UserResponseType;
  users: UserResponseType[];
};

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <ListGroup>
      {users.map((user) => (
        <ListGroup.Item key={user._id}>{user.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default UsersList;
