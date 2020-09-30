import { createSelector } from 'reselect';

import { AppStateType, GlobalStateType, UserType } from '../../types';
import { LS_KEY } from '../../constants';

export const localUserId = localStorage.getItem(LS_KEY);

export const appSelector = (state: GlobalStateType): AppStateType => state.app;

export const loadingSelector = createSelector(
  appSelector,
  (app) => app.loading,
);

export const currentUserSelector = createSelector(
  appSelector,
  (app) => app.currentUser as UserType,
);

export const votesListSelector = createSelector(
  appSelector,
  (app) => app.votesList,
);

export const userVoteSelector = createSelector(
  appSelector,
  (app) => app.userVote,
);

export const votingEndedSelector = createSelector(
  appSelector,
  (app) => app.votingEnded,
);

export const summarySelector = createSelector(
  appSelector,
  (app) => app.summary,
);

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
