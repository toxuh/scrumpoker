import { produce } from 'immer';

import { AppStateType, ReduxActionType, UserType } from '../../types';

import * as types from './types';

const initialState: AppStateType = {
  currentUser: false,
  loading: true,
  storiesList: [],
  usersList: [],
  userVote: false,
  votesList: [],
  votingEnded: false,
};

const appReducer = (state = initialState, action: ReduxActionType) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.LOADING: {
        draft.loading = true;
        break;
      }

      case types.BOOTSTRAP_DONE: {
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

      case types.SET_CURRENT_USER: {
        draft.currentUser = payload as UserType;
        break;
      }

      case types.SET_VOTES_LIST: {
        draft.votesList = payload as [];
        break;
      }

      case types.RESET_APP: {
        return initialState;
      }
    }
  });

export default appReducer;
