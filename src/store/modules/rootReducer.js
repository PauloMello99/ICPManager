import { combineReducers } from 'redux';

import auth from './auth/reducer';
import calendar from './calendar/reducer';
import ui from './ui/reducer';
import notifications from './notifications/reducer';

export default combineReducers({ auth, calendar, ui, notifications });
