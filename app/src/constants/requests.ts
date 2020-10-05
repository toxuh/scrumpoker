const appPrefix = 'app';
const jiraPrefix = 'jira';
const storiesPrefix = 'stories';
const usersPrefix = 'users';
const votePrefix = 'vote';

export const APP_RESET = `${appPrefix}/reset`;

export const CONNECT_USER = `${usersPrefix}/connect`;
export const USER_CONNECTED = `${usersPrefix}/connected`;
export const DISCONNECT_USER = `${usersPrefix}/disconnect`;
export const CREATE_USER = `${usersPrefix}/create`;
export const USER_CREATED = `${usersPrefix}/created`;
export const SET_MODERATOR_ROLE = `${usersPrefix}/moderator`;

export const GET_STORIES_LIST = `${storiesPrefix}/get`;
export const STORIES_LIST = `${storiesPrefix}/list`;
export const CREATE_STORY = `${storiesPrefix}/create`;
export const DELETE_STORY = `${storiesPrefix}/delete`;
export const SKIP_STORY = `${storiesPrefix}/skip`;

export const SET_VOTE = `${votePrefix}/set`;
export const GET_VOTES_LIST = `${votePrefix}/list`;
export const END_VOTE = `${votePrefix}/end`;
export const VOTE_ENDED = `${votePrefix}/ended`;
export const CLEAR_VOTE = `${votePrefix}/clear`;

export const GET_EPICS_LIST = `${jiraPrefix}/epics`;
export const EPICS_LIST = `${jiraPrefix}/epics-list`;
export const GET_ISSUES_LIST = `${jiraPrefix}/issues`;
