export function loadProjectsRequest() {
    return {
        type: '@calendar/LOAD_PROJECTS_REQUEST',
    };
}

export function loadProjectsSuccess(dots, items) {
    return {
        type: '@calendar/LOAD_PROJECTS_SUCCESS',
        payload: { dots, items },
    };
}

export function loadProjectsFailure() {
    return {
        type: '@calendar/LOAD_PROJECTS_FAILURE',
    };
}
