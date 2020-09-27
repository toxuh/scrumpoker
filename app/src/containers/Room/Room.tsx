import React, { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { Room as RoomComponent } from '../../components';

import { StoryType, UserType, VoteType } from '../../types';

type RoomTypes = {
  currentUser: UserType;
  users: UserType[];
  stories: StoryType[];
  clearVotes: ({}) => void;
  socket: typeof Socket;
};

const Room: React.FC<RoomTypes> = ({ currentUser, users, stories, socket }) => {
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
      socket={socket}
    />
  );
};

export default Room;
