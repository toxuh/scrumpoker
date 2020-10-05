import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { bootstrapDone, setStoriesList } from './actions';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { GET_STORIES_LIST, STORIES_LIST } from '../../constants/requests';

import { StoryType } from '../../types';

const useStories = () => {
  const dispatch = useDispatch();

  const getStories = useCallback(() => {
    handleSocketRequest({
      type: GET_STORIES_LIST,
    });
  }, []);

  const listenStoriesList = useCallback(() => {
    handleSocketListener({
      type: STORIES_LIST,
      callback: (stories: StoryType[]) => {
        dispatch(setStoriesList(stories));
        dispatch(bootstrapDone());
      },
    });
  }, [dispatch]);

  return { getStories, listenStoriesList };
};

export default useStories;
