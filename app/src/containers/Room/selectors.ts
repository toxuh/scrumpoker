import { createSelector } from 'reselect';

import { JiraStateType, GlobalStateType } from '../../types';

export const jiraSelector = (state: GlobalStateType): JiraStateType =>
  state.jira;

export const epicsListSelector = createSelector(
  jiraSelector,
  (jira) => jira.epicsList,
);
