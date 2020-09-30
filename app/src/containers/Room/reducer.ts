import { produce } from 'immer';

import * as types from './types';

import { JiraStateType, ReduxActionType, JiraEpicType } from '../../types';

const initialState: JiraStateType = {
  epicsList: [],
};

const jiraReducer = (state = initialState, action: ReduxActionType) =>
  produce(state, (draft) => {
    const { type, payload } = action;

    switch (type) {
      case types.SET_EPICS_LIST: {
        draft.epicsList = payload as JiraEpicType[];
        break;
      }
    }
  });

export default jiraReducer;
