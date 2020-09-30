import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleSocketListener, handleSocketRequest } from '../../api';
import { JiraEpicType } from '../../types';

import { setEpicsList } from './actions';
import { epicsListSelector } from './selectors';

const useJira = () => {
  const dispatch = useDispatch();

  const epicsList = useSelector(epicsListSelector);

  const getJiraEpics = useCallback(() => {
    handleSocketRequest({
      type: 'jira-get-epics',
    });
  }, []);

  const getJiraStories = useCallback((list) => {
    handleSocketRequest({
      type: 'jira-get-stories',
      payload: list,
    });
  }, []);

  const listenJiraEpics = useCallback(() => {
    handleSocketListener({
      type: 'jira-epics-list',
      callback: (list: JiraEpicType[]) => {
        dispatch(setEpicsList(list));
      },
    });
  }, [dispatch]);

  const listenJiraStories = useCallback(() => {
    handleSocketListener({
      type: 'jira-stories-list',
      callback: (list: []) => {
        console.log(list);
      },
    });
  }, [dispatch]);

  return {
    epicsList,
    getJiraEpics,
    getJiraStories,
    listenJiraEpics,
    listenJiraStories,
  };
};

export default useJira;
