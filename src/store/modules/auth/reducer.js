/* eslint-disable no-param-reassign */

import produce from 'immer';

const INITIAL_STATE = {
    uid: null,
    type: null,
    name: null,
    picture: null,
    email: null,
    universityList: [],

    // UI elements
    loading: false,
    recoverPasswordLoading: false,
};

export default function auth(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@auth/SIGN_IN_SUCCESS': {
                draft.uid = action.payload.uid;
                draft.name = action.payload.name;
                draft.type = action.payload.type;
                draft.picture = action.payload.picture;
                draft.email = action.payload.email;
                draft.universityList = action.payload.universityList;
                draft.loading = false;
                break;
            }
            case '@auth/SYNC_DATA': {
                draft.name = action.payload.name;
                draft.picture = action.payload.picture;
                draft.email = action.payload.email;
                draft.universityList = action.payload.universityList;
                break;
            }
            case '@auth/SIGN_IN_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/RECOVER_PASSWORD_REQUEST': {
                draft.recoverPasswordLoading = true;
                break;
            }
            case '@auth/RECOVER_PASSWORD_SUCCESS': {
                draft.recoverPasswordLoading = false;
                break;
            }
            case '@auth/RECOVER_PASSWORD_FAILURE': {
                draft.recoverPasswordLoading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.uid = null;
                draft.name = null;
                draft.type = null;
                draft.picture = null;
                draft.email = null;
                draft.universityList = [];
                draft.loading = false;
                draft.recoverPasswordLoading = false;
                draft.loadingReset = false;
                break;
            }
            default:
        }
    });
}
