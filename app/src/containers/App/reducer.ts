import { produce } from 'immer';

import { AppStateType, ReduxActionType, UserType } from '../../types';

import * as types from './types';

const initialState: AppStateType = {
  currentUser: false,
  localUserId: undefined,
  loading: true,
  storiesList: [],
  usersList: [],
  userVote: false,
  votesList: [],
  votingEnded: false,
  summary: 0,
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

      case types.SET_LOCAL_USER_ID: {
        draft.localUserId = payload as string;
        break;
      }

      case types.SET_USER_VOTE: {
        draft.userVote = payload as string | boolean;
        break;
      }

      case types.SET_VOTES_LIST: {
        draft.votesList = payload as [];
        break;
      }

      case types.SET_VOTING_ENDED: {
        draft.votingEnded = payload as boolean;
        break;
      }

      case types.SET_SUMMARY: {
        draft.summary = payload as number;
        break;
      }

      case types.RESET_APP: {
        return initialState;
      }
    }
  });

export default appReducer;
