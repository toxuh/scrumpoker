import { produce } from 'immer';

import { AppStateType, ReduxActionType } from '../../types';
import { successType } from '../../utils/types';

import * as types from './types';

const initialState: AppStateType = {
  loading: true,
  authenticated: false,
  usersList: [],
  storiesList: [],
  userVote: false,
};

const appReducer = (state = initialState, action: ReduxActionType) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case successType(types.BOOTSTRAP): {
        draft.loading = false;
        break;
      }

      case types.SET_STORIES_LIST: {
        draft.storiesList = payload as [];
        break;
      }

      case types.SET_USERS_LIST: {
        draft.usersList = payload as [];
        break;
      }

      case types.RESET_APP: {
        return initialState;
      }
    }
  });

export default appReducer;
