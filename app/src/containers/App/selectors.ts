import { createSelector } from 'reselect';

import { AppStateType, GlobalStateType, UserType } from '../../types';
import { LS_KEY } from '../../constants';

export const localUserId = localStorage.getItem(LS_KEY);

export const appSelector = (state: GlobalStateType): AppStateType => state.app;

export const loadingSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.loading,
);

export const storiesListSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.storiesList,
);

export const usersListSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.usersList,
);

export const currentUserSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.currentUser as UserType,
);
