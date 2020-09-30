import * as types from './types';

import { JiraEpicType } from '../../types';

export const setEpicsList = (payload: JiraEpicType[]) => ({
  type: types.SET_EPICS_LIST,
  payload,
});
