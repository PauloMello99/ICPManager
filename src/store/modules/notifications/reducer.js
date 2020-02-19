/* eslint-disable no-param-reassign */

import produce from 'immer';

const INITIAL_STATE = {
    notifications: [],
    loading: false,
};

export default function notifications(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@notification/LOAD_NOTIFICATIONS_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@notification/LOAD_NOTIFICATIONS_SUCCESS': {
                draft.notifications = action.payload.notifications;
                draft.loading = false;
                break;
            }
            case '@notification/LOAD_NOTIFICATIONS_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.notifications = [];
                draft.loading = false;
                break;
            }
            default:
        }
    });
}
