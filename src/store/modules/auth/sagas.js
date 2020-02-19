import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { showSuccessSnackbar, showErrorSnackbar } from '~/services/Snackbar';
import NavigationService from '~/navigation/NavigationService';
import translate from '~/languages';
import {
    login,
    recoverUserPassword,
    user,
    userProfile,
    resetEmail as resetUserEmail,
    resetPassword as resetUserPassword,
} from '~/services/firebase';

import StudentDAO from '~/dao/StudentDAO';
import CoordinatorDAO from '~/dao/CoordinatorDAO';
import ProfessorDAO from '~/dao/ProfessorDAO';

import {
    signInSuccess,
    signInFailure,
    recoverPasswordFailure,
    recoverPasswordSuccess,
    resetFailure,
    resetSuccess,
    signOut,
} from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(login, email, password);
        const { uid } = response.user;

        const userBasicData = yield call(user, uid);
        const { type } = userBasicData.val();

        const userInfo = yield call(userProfile, type, uid);
        if (!userInfo) {
            showErrorSnackbar(translate('login_user_info_failure'));
            yield put(signInFailure());
        }
        const { name, picture, universityList } = userInfo.val();

        yield put(
            signInSuccess(uid, name, type, picture, email, universityList)
        );
        NavigationService.navigate('RootStack');
    } catch (error) {
        showErrorSnackbar(translate('login_failure'));
        yield put(signInFailure());
    }
}

export function* recoverPassword({ payload }) {
    try {
        const { email } = payload;
        yield call(recoverUserPassword, email);
        showSuccessSnackbar(translate('login_recover_success'));
        yield put(recoverPasswordSuccess());
    } catch (error) {
        showErrorSnackbar(translate('login_recover_failure'));
        yield put(recoverPasswordFailure());
    }
}

export function* resetEmail({ payload }) {
    try {
        const { uid, email, type } = yield select(state => state.auth);
        const { oldEmail, password, newEmail } = payload;

        if (newEmail === oldEmail) {
            showErrorSnackbar(translate('reset_same_email_error'));
            yield put(resetFailure());
            return;
        }

        if (oldEmail !== email) {
            showErrorSnackbar(translate('reset_diff_login_error'));
            yield put(resetFailure());
            return;
        }

        yield call(login, oldEmail, password);
        yield call(resetUserEmail, newEmail);

        const studentDAO = new StudentDAO();
        const professorDAO = new ProfessorDAO();
        const coordinatorDAO = new CoordinatorDAO();

        switch (type) {
            case 'student': {
                yield studentDAO.update(uid, { email: newEmail });
                break;
            }
            case 'professor': {
                yield professorDAO.update(uid, { email: newEmail });
                break;
            }
            case 'coordinator': {
                yield professorDAO.update(uid, { email: newEmail });
                yield coordinatorDAO.update(uid, { email: newEmail });
                break;
            }
            default:
        }
        yield put(resetSuccess());
        NavigationService.navigate('SplashScreen');
    } catch (err) {
        yield put(resetFailure());
        showErrorSnackbar(translate('reset_email_error'));
    }
}

export function* resetPassword({ payload }) {
    try {
        const { email } = yield select(state => state.auth);
        const { email: newPasswordEmail, oldPassword, newPassword } = payload;

        if (newPasswordEmail !== email) {
            showErrorSnackbar(translate('reset_diff_login_error'));
            yield put(resetFailure());
            return;
        }

        yield call(login, newPasswordEmail, oldPassword);
        yield call(resetUserPassword, newPassword);

        yield put(resetSuccess());
        yield put(signOut());
        NavigationService.navigate('LoginStack');
    } catch (err) {
        yield put(resetFailure());
        showErrorSnackbar(translate('reset_password_error'));
    }
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/RECOVER_PASSWORD_REQUEST', recoverPassword),
    takeLatest('@auth/RESET_EMAIL_REQUEST', resetEmail),
    takeLatest('@auth/RESET_PASSWORD_REQUEST', resetPassword),
]);
