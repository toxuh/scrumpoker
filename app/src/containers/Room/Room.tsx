import React from 'react';

import useStories from './useStories';
import useUsers from './useUsers';

import { Room as RoomComponent } from '../../components';

type RoomTypes = {
  clearVotes: (payload: {}) => void;
};

const Room: React.FC<RoomTypes> = ({ clearVotes }) => {
  const {
    allStories,
    activeStories,
    closedStories,
    currentStory,
  } = useStories();
  const { currentUser, users } = useUsers();

  return (
    <RoomComponent
      allStories={allStories}
      activeStories={activeStories}
      closedStories={closedStories}
      currentStory={currentStory}
      currentUser={currentUser}
      users={users}
    />
  );
};

export default Room;
