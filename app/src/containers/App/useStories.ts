import { useCallback, useState } from 'react';
import { Socket } from 'socket.io-client';

import { StoryType } from '../../types';

const useStories = (socket: typeof Socket) => {
  const [stories, setStories] = useState<StoryType[]>([] as StoryType[]);

  const listenStoriesList = useCallback(() => {
    socket.on('tasks-list', (stories: StoryType[]) => {
      setStories(stories);
    });
  }, []);

  const getStories = useCallback(() => {
    socket.emit('get-tasks');
  }, [socket]);

  return { getStories, listenStoriesList, stories };
};

export default useStories;
