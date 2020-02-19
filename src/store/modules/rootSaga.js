import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import calendar from './calendar/sagas';

export default function* rootSaga() {
    return yield all([auth, calendar]);
}
