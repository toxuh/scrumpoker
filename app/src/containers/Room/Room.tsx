import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { Story, UserResponseType } from '../../types';

type RoomTypes = {
  user: UserResponseType;
  socket: typeof Socket;
  stories: Story[];
};

const Room: React.FC<RoomTypes> = ({ user, stories, socket }) => {
  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    socket.emit('remove-task', taskId);
  }, []);

  return (
    <RoomComponent
      user={user}
      stories={stories}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
    />
  );
};

export default Room;
