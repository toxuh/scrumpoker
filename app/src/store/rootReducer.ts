import { combineReducers } from 'redux';

import appReducer from '../containers/App/reducer';
import jiraReducer from '../containers/Room/reducer';

export default combineReducers({
  app: appReducer,
  jira: jiraReducer,
});
