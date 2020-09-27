import { createSelector } from 'reselect';

import { AppStateType, GlobalStateType } from '../../types';

export const appSelector = (state: GlobalStateType): AppStateType => state.app;

export const allStoriesListSelector = createSelector(
  appSelector,
  (app) => app.storiesList,
);

export const activeStoriesListSelector = createSelector(
  allStoriesListSelector,
  (stories) => stories.filter((story) => story.isActive),
);

export const closedStoriesListSelector = createSelector(
  allStoriesListSelector,
  (stories) => stories.filter((story) => !story.isActive),
);

export const currentStorySelector = createSelector(
  activeStoriesListSelector,
  (stories) => stories[0] || undefined,
);

export const usersListSelector = createSelector(
  appSelector,
  (app) => app.usersList,
);
