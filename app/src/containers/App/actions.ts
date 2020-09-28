import * as types from './types';

import { StoryType, UserType, VoteType } from '../../types';

export const loading = () => ({
  type: types.LOADING,
});

export const bootstrapDone = () => ({
  type: types.BOOTSTRAP_DONE,
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

export const setCurrentUser = (payload: UserType) => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export const setVotesList = (payload: VoteType[]) => ({
  type: types.SET_VOTES_LIST,
  payload,
});

export const setUserVote = (payload: string) => ({
  type: types.SET_USER_VOTE,
  payload,
});

export const setVotingEnded = (payload: boolean) => ({
  type: types.SET_VOTING_ENDED,
  payload,
});

export const setSummary = (payload: number) => ({
  type: types.SET_SUMMARY,
  payload,
});
