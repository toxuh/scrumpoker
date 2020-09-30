import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
  allStoriesListSelector,
  activeStoriesListSelector,
  closedStoriesListSelector,
  currentStorySelector,
} from '../App/selectors';

import { handleSocketRequest } from '../../api';

const useStories = () => {
  const allStories = useSelector(allStoriesListSelector);
  const activeStories = useSelector(activeStoriesListSelector);
  const closedStories = useSelector(closedStoriesListSelector);
  const currentStory = useSelector(currentStorySelector);

  const addStory = useCallback((payload) => {
    handleSocketRequest({
      type: 'new-story',
      payload,
    });
  }, []);

  const removeStory = useCallback((payload) => {
    handleSocketRequest({
      type: 'remove-story',
      payload,
    });
  }, []);

  const skipStory = useCallback((payload) => {
    handleSocketRequest({
      type: 'skip-story',
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
