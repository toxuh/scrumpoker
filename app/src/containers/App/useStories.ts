import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bootstrapDone, setStoriesList } from './actions';
import { storiesListSelector } from './selectors';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { StoryType } from '../../types';

const useStories = () => {
  const dispatch = useDispatch();

  const stories = useSelector(storiesListSelector);

  const listenStoriesList = useCallback(() => {
    handleSocketListener({
      type: 'tasks-list',
      callback: (stories: StoryType[]) => {
        dispatch(setStoriesList(stories));
        dispatch(bootstrapDone());
      },
    });
  }, [dispatch, handleSocketListener]);

  const getStories = useCallback(() => {
    handleSocketRequest({
      type: 'get-stories',
    });
  }, [handleSocketRequest]);

  const addStory = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'new-story',
        payload,
      });
    },
    [handleSocketRequest],
  );

  const removeStory = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'remove-story',
        payload,
      });
    },
    [handleSocketRequest],
  );

  const skipStory = useCallback(
    (payload) => {
      handleSocketRequest({
        type: 'skip-story',
        payload,
      });
    },
    [handleSocketRequest],
  );

  return {
    addStory,
    getStories,
    listenStoriesList,
    removeStory,
    skipStory,
    stories,
  };
};

export default useStories;
