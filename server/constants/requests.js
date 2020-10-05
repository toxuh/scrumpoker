const appPrefix = "app";
const jiraPrefix = "jira";
const storiesPrefix = "stories";
const usersPrefix = "users";
const votePrefix = "vote";

module.exports = {
  APP_RESET: `${appPrefix}/reset`,

  CONNECT_USER: `${usersPrefix}/connect`,
  USER_CONNECTED: `${usersPrefix}/connected`,
  DISCONNECT_USER: `${usersPrefix}/disconnect`,
  CREATE_USER: `${usersPrefix}/create`,
  USER_CREATED: `${usersPrefix}/created`,
  SET_MODERATOR_ROLE: `${usersPrefix}/moderator`,

  GET_STORIES_LIST: `${storiesPrefix}/get`,
  STORIES_LIST: `${storiesPrefix}/list`,
  CREATE_STORY: `${storiesPrefix}/create`,
  DELETE_STORY: `${storiesPrefix}/delete`,
  SKIP_STORY: `${storiesPrefix}/skip`,

  SET_VOTE: `${votePrefix}/set`,
  GET_VOTES_LIST: `${votePrefix}/list`,
  END_VOTE: `${votePrefix}/end`,
  VOTE_ENDED: `${votePrefix}/ended`,
  CLEAR_VOTE: `${votePrefix}/clear`,

  GET_EPICS_LIST: `${jiraPrefix}/epics`,
  EPICS_LIST: `${jiraPrefix}/epics-list`,
  GET_ISSUES_LIST: `${jiraPrefix}/issues`,
};
