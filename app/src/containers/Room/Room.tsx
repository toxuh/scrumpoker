import React, { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType, VoteType } from '../../types';

type RoomTypes = {
  currentUser: UserType;
  users: UserType[];
  votes: VoteType[];
  stories: StoryType[];
  voteEnded: boolean;
  handleVote: ({}) => void;
  handleEndVoting: (sum: { taskId: string; points: number }) => void;
  clearVotes: ({}) => void;
  socket: typeof Socket;
  summary: number;
};

const Room: React.FC<RoomTypes> = ({
  currentUser,
  users,
  votes,
  voteEnded,
  handleVote,
  handleEndVoting,
  clearVotes,
  stories,
  socket,
  summary,
}) => {
  const [activeStory, setActiveStory] = useState<StoryType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Boolean(stories.length)) {
      setActiveStory(stories.filter((story) => story.isActive)[0]);
    }
  }, [stories]);

  const handleAddTask = useCallback((taskName) => {
    socket.emit('new-task', taskName);
  }, []);

  const handleRemoveTask = useCallback((taskId) => {
    socket.emit('remove-task', taskId);
  }, []);

  const handleSkipStory = useCallback((taskId) => {
    socket.emit('skip-story', taskId);
  }, []);

  return (
    <RoomComponent
      activeStory={activeStory}
      currentUser={currentUser}
      users={users}
      votes={votes}
      voteEnded={voteEnded}
      handleVote={handleVote}
      handleEndVoting={handleEndVoting}
      stories={stories}
      summary={summary}
      handleAddTask={handleAddTask}
      handleRemoveTask={handleRemoveTask}
      handleClearVotes={clearVotes}
      handleSkipStory={handleSkipStory}
    />
  );
};

export default Room;
