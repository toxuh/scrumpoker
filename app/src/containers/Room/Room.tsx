import React, { useEffect, useState } from 'react';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType } from '../../types';

type RoomTypes = {
  currentUser: UserType;
  users: UserType[];
  stories: StoryType[];
  clearVotes: (payload: {}) => void;
};

const Room: React.FC<RoomTypes> = ({ currentUser, users, stories }) => {
  const [activeStory, setActiveStory] = useState<StoryType | undefined>(
    undefined,
  );

  useEffect(() => {
    if (Boolean(stories.length)) {
      setActiveStory(stories.filter((story) => story.isActive)[0]);
    }
  }, [stories]);

  return (
    <RoomComponent
      activeStory={activeStory}
      currentUser={currentUser}
      users={users}
      stories={stories}
    />
  );
};

export default Room;
