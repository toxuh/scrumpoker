import * as types from './types';

import { StoryType, UserType } from '../../types';
import { successType } from '../../utils/types';

export const bootstrapSuccess = () => ({
  type: successType(types.BOOTSTRAP),
});

export const resetApp = () => ({
  type: types.RESET_APP,
});

export const setStoriesList = (payload: StoryType[]) => ({
  type: types.SET_STORIES_LIST,
  payload,
});

export const setUsersList = (payload: UserType[]) => ({
  type: types.SET_USERS_LIST,
  payload,
});
