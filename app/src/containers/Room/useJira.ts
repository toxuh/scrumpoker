import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleSocketListener, handleSocketRequest } from '../../api';
import {
  EPICS_LIST,
  GET_EPICS_LIST,
  GET_ISSUES_LIST,
} from '../../constants/requests';
import { JiraEpicType } from '../../types';

import { setEpicsList } from './actions';
import { epicsListSelector } from './selectors';

const useJira = () => {
  const dispatch = useDispatch();

  const epicsList = useSelector(epicsListSelector);

  const getJiraEpics = useCallback(() => {
    handleSocketRequest({
      type: GET_EPICS_LIST,
    });
  }, []);

  const getJiraStories = useCallback((list) => {
    handleSocketRequest({
      type: GET_ISSUES_LIST,
      payload: list,
    });
  }, []);

  const listenJiraEpics = useCallback(() => {
    handleSocketListener({
      type: EPICS_LIST,
      callback: (list: JiraEpicType[]) => {
        dispatch(setEpicsList(list));
      },
    });
  }, [dispatch]);

  return {
    epicsList,
    getJiraEpics,
    getJiraStories,
    listenJiraEpics,
  };
};

export default useJira;
