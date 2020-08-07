import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { Task, UserResponseType } from '../../types';

type RoomTypes = {
  user: UserResponseType;
  socket: typeof Socket;
  tasks: Task[];
};

const Room: React.FC<RoomTypes> = ({ user, tasks, socket }) => {
  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  return (
    <RoomComponent user={user} tasks={tasks} handleAddTask={handleAddTask} />
  );
};

export default Room;
