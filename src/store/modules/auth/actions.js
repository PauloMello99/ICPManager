export function signInRequest(email, password) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, password },
    };
}

export function signInSuccess(uid, name, type, picture, email, universityList) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: { uid, name, type, picture, email, universityList },
    };
}

export function syncData(name, email, picture, universityList) {
    return {
        type: '@auth/SYNC_DATA',
        payload: { name, email, picture, universityList },
    };
}

export function signInFailure() {
    return {
        type: '@auth/SIGN_IN_FAILURE',
    };
}

export function recoverPasswordRequest(email) {
    return {
        type: '@auth/RECOVER_PASSWORD_REQUEST',
        payload: { email },
    };
}

export function recoverPasswordSuccess() {
    return {
        type: '@auth/RECOVER_PASSWORD_SUCCESS',
    };
}

export function recoverPasswordFailure() {
    return {
        type: '@auth/RECOVER_PASSWORD_FAILURE',
    };
}

export function resetEmailRequest(oldEmail, password, newEmail) {
    return {
        type: '@auth/RESET_EMAIL_REQUEST',
        payload: { oldEmail, password, newEmail },
    };
}

export function resetPasswordRequest(email, oldPassword, newPassword) {
    return {
        type: '@auth/RESET_PASSWORD_REQUEST',
        payload: { email, oldPassword, newPassword },
    };
}

export function resetSuccess() {
    return {
        type: '@auth/RESET_SUCCESS',
    };
}

export function resetFailure() {
    return {
        type: '@auth/RESET_FAILURE',
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
    };
}
