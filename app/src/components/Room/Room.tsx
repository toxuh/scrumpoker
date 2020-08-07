import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Buttons from './Buttons';
import Cardboard from './Cardboard';
import Header from './Header';
import TasksList from './TasksList';
import UsersList from './UsersList';

import { Task, UserResponseType } from '../../types';

type RoomProps = {
  user: UserResponseType;
  tasks: Task[];
  handleAddTask: (taskName: string) => void;
};

const Room: React.FC<RoomProps> = ({ user, tasks, handleAddTask }) => {
  return (
    <Row>
      <Col xs={8}>
        <Header title="Hello!" />
        <Cardboard />
        <TasksList tasks={tasks} handleAddTask={handleAddTask} />
      </Col>
      <Col>
        <UsersList currentUser={user} users={[user]} />
        <Buttons />
      </Col>
    </Row>
  );
};

export default Room;
