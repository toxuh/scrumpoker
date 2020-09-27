import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { StoryType } from '../../types';
import { bootstrapDone, setStoriesList } from './actions';

const useStories = () => {
  const dispatch = useDispatch();

  const getStories = useCallback(() => {
    handleSocketRequest({
      type: 'get-stories',
    });
  }, []);

  const listenStoriesList = useCallback(() => {
    handleSocketListener({
      type: 'tasks-list',
      callback: (stories: StoryType[]) => {
        dispatch(setStoriesList(stories));
        dispatch(bootstrapDone());
      },
    });
  }, [dispatch]);

  return { getStories, listenStoriesList };
};

export default useStories;
