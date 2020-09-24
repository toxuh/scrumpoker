import { createSelector } from 'reselect';

import { AppStateType, GlobalStateType, UserType } from '../../types';
import { LS_KEY } from '../../constants';

export const localUserId = localStorage.getItem(LS_KEY);

export const appSelector = (state: GlobalStateType): AppStateType => state.app;

export const storiesListSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.storiesList,
);

export const usersListSelector = createSelector(
  appSelector,
  (app: AppStateType) => app.usersList,
);

export const currentUserSelector = createSelector(
  usersListSelector,
  (users: UserType[]) =>
    users.find((user) => user._id === localUserId) as UserType,
);
