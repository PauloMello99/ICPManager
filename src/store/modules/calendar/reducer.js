/* eslint-disable no-param-reassign */

import produce from 'immer';

const INITIAL_STATE = {
    dots: {},
    items: {},
    loading: false,
};

export default function calendar(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@calendar/LOAD_PROJECTS_REQUEST': {
                draft.loading = true;
                break;
            }
            case '@calendar/LOAD_PROJECTS_SUCCESS': {
                draft.loading = false;
                draft.dots = action.payload.dots;
                draft.items = action.payload.items;
                break;
            }
            case '@calendar/LOAD_PROJECTS_FAILURE': {
                draft.loading = false;
                break;
            }
            case '@auth/SIGN_OUT': {
                draft.dots = {};
                draft.items = {};
                draft.loading = false;
                break;
            }
            default:
        }
    });
}
