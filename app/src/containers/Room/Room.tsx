import React, { useCallback } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType } from '../../types';

type RoomTypes = {
  currentUser: UserType;
  users: UserType[];
  votes: string[];
  handleVote: (points: number) => void;
  socket: typeof Socket;
  stories: StoryType[];
};

const Room: React.FC<RoomTypes> = ({
  currentUser,
  users,
  votes,
  handleVote,
  stories,
  socket,
}) => {
  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    socket.emit('remove-task', taskId);
  }, []);

  return (
    <RoomComponent
      currentUser={currentUser}
      users={users}
      votes={votes}
      handleVote={handleVote}
      stories={stories}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
    />
  );
};

export default Room;
