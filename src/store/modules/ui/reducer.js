/* eslint-disable no-param-reassign */

import produce from 'immer';

const INITIAL_STATE = {
    statusColor: '#fff',
    statusContent: 'dark-content',
    loadingReset: false,
};

export default function ui(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@ui/CHANGE_STATUSBAR_COLOR': {
                draft.statusColor = action.payload.statusColor;
                draft.statusContent = action.payload.statusContent;
                break;
            }
            case '@auth/RESET_EMAIL_REQUEST': {
                draft.loadingReset = true;
                break;
            }
            case '@auth/RESET_PASSWORD_REQUEST': {
                draft.loadingReset = true;
                break;
            }
            case '@auth/RESET_SUCCESS': {
                draft.loadingReset = false;
                break;
            }
            case '@auth/RESET_FAILURE': {
                draft.loadingReset = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.statusColor = '#fff';
                draft.statusContent = 'dark-content';
                break;
            }
            default:
        }
    });
}
