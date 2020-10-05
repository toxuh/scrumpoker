import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  allStoriesListSelector,
  activeStoriesListSelector,
  closedStoriesListSelector,
  currentStorySelector,
} from '../App/selectors';

import { handleSocketRequest } from '../../api';
import {
  CREATE_STORY,
  DELETE_STORY,
  SKIP_STORY,
} from '../../constants/requests';

const useStories = () => {
  const allStories = useSelector(allStoriesListSelector);
  const activeStories = useSelector(activeStoriesListSelector);
  const closedStories = useSelector(closedStoriesListSelector);
  const currentStory = useSelector(currentStorySelector);

  const addStory = useCallback((payload) => {
    handleSocketRequest({
      type: CREATE_STORY,
      payload,
    });
  }, []);

  const removeStory = useCallback((payload) => {
    handleSocketRequest({
      type: DELETE_STORY,
      payload,
    });
  }, []);

  const skipStory = useCallback((payload) => {
    handleSocketRequest({
      type: SKIP_STORY,
      payload,
    });
  }, []);

  return {
    addStory,
    allStories,
    activeStories,
    closedStories,
    currentStory,
    removeStory,
    skipStory,
  };
};

export default useStories;
