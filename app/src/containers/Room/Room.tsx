import React, { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType, VoteType } from '../../types';

type RoomTypes = {
  currentUser: UserType;
  users: UserType[];
  votes: VoteType[];
  voteEnded: boolean;
  handleVote: ({}) => void;
  socket: typeof Socket;
  stories: StoryType[];
};

const Room: React.FC<RoomTypes> = ({
  currentUser,
  users,
  votes,
  voteEnded,
  handleVote,
  stories,
  socket,
}) => {
  const [activeStory, setActiveStory] = useState<StoryType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Boolean(stories.length)) {
      setActiveStory(stories[0]);
    }
  }, [stories]);

  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    socket.emit('remove-task', taskId);
  }, []);

  return (
    <RoomComponent
      activeStory={activeStory}
      currentUser={currentUser}
      users={users}
      votes={votes}
      voteEnded={voteEnded}
      handleVote={handleVote}
      stories={stories}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
    />
  );
};

export default Room;
