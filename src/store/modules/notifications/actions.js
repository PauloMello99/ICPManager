export function acceptNotification(id, projectId) {
    return {
        type: '@notification/ACCEPT_NOTIFICATION',
        payload: { id, projectId },
    };
}

export function removeNotification(id) {
    return {
        type: '@notification/REMOVE_NOTIFICATION',
        payload: { id },
    };
}

export function loadNotificationsRequest(notifications) {
    return {
        type: '@notification/LOAD_NOTIFICATIONS_REQUEST',
        payload: { notifications },
    };
}

export function loadNotificationsSuccess(notifications) {
    return {
        type: '@notification/LOAD_NOTIFICATIONS_SUCCESS',
        payload: { notifications },
    };
}

export function loadNotificationsFailure(notifications) {
    return {
        type: '@notification/LOAD_NOTIFICATIONS_FAILURE',
        payload: { notifications },
    };
}
