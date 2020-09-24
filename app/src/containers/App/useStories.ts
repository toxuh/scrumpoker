import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Socket } from 'socket.io-client';

import { bootstrapDone, setStoriesList } from './actions';
import { storiesListSelector } from './selectors';

import { StoryType } from '../../types';

const useStories = (socket: typeof Socket) => {
  const dispatch = useDispatch();

  const stories = useSelector(storiesListSelector);

  const listenStoriesList = useCallback(() => {
    socket.on('tasks-list', (stories: StoryType[]) => {
      dispatch(setStoriesList(stories));
      dispatch(bootstrapDone());
    });
  }, [socket]);

  const getStories = useCallback(() => {
    socket.emit('get-tasks');
  }, [socket]);

  return { getStories, listenStoriesList, stories };
};

export default useStories;
