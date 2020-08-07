import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Header from './Header';
import UsersList from './UsersList';

import { UserResponseType } from '../../types';

type RoomTypes = {
  user: UserResponseType;
};

const Room: React.FC<RoomTypes> = ({ user }) => {
  return (
    <Row>
      <Col xs={8}>
        <Header title="Hello!" />
      </Col>
      <Col>
        <UsersList currentUser={user} users={[user]} />
      </Col>
    </Row>
  );
};

export default Room;
