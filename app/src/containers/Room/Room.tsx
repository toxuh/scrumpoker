import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType } from '../../types';

type RoomTypes = {
  users: UserType[];
  socket: typeof Socket;
  stories: StoryType[];
};

const Room: React.FC<RoomTypes> = ({ users, stories, socket }) => {
  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    socket.emit('remove-task', taskId);
  }, []);

  return (
    <RoomComponent
      users={users}
      stories={stories}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
    />
  );
};

export default Room;
