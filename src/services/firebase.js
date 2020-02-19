import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';
import '@react-native-firebase/messaging';

export async function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function register(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function currentUser() {
    return firebase.auth().currentUser;
}

export async function resetPassword(newPassword) {
    const curUser = await currentUser();
    return curUser.updatePassword(newPassword);
}

export async function resetEmail(newEmail) {
    const curUser = await currentUser();
    return curUser.updateEmail(newEmail);
}

export async function getCredential(email, password) {
    return firebase.auth.EmailAuthProvider.credential(email, password);
}

export async function recoverUserPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
}

export function notificationsRT(id, callback) {
    return firebase
        .database()
        .ref('users')
        .child(id)
        .child('notifications')
        .on('value', callback);
}

export function user(id) {
    return firebase
        .database()
        .ref('users')
        .child(id)
        .once('value');
}

export function student(id) {
    return firebase
        .database()
        .ref('students')
        .child(id)
        .once('value');
}

export function studentRT(id, callback) {
    return firebase
        .database()
        .ref('students')
        .child(id)
        .on('value', callback);
}

export function students() {
    return firebase
        .database()
        .ref('students')
        .once('value');
}

export function professor(id) {
    return firebase
        .database()
        .ref('professors')
        .child(id)
        .once('value');
}

export function professorRT(id, callback) {
    return firebase
        .database()
        .ref('professors')
        .child(id)
        .on('value', callback);
}

export function professors() {
    return firebase
        .database()
        .ref('professors')
        .once('value');
}

export function coordinator(id) {
    return firebase
        .database()
        .ref('coordinators')
        .child(id)
        .once('value');
}

export function coordinatorRT(id, callback) {
    return firebase
        .database()
        .ref('coordinators')
        .child(id)
        .on('value', callback);
}

export function coordinators() {
    return firebase
        .database()
        .ref('coordinators')
        .once('value');
}

export function projects() {
    return firebase
        .database()
        .ref('projects')
        .once('value');
}

export function project(id) {
    return firebase
        .database()
        .ref('projects')
        .child(id)
        .once('value');
}

export function projectRT(id, callback) {
    return firebase
        .database()
        .ref('projects')
        .child(id)
        .on('value', callback);
}

export function university(id) {
    return firebase
        .database()
        .ref('universities')
        .child(id)
        .once('value');
}

export function universitiesRT(id, callback) {
    return firebase
        .database()
        .ref('universities')
        .child(id)
        .on('value', callback);
}

export function universities() {
    return firebase
        .database()
        .ref('universities')
        .once('value');
}

export function feeds(callback) {
    return firebase
        .database()
        .ref('feeds')
        .on('value', callback);
}

export function photo(uid) {
    return firebase
        .storage()
        .ref('profile_photo/')
        .child(`${uid}.jpg`);
}

export async function setPhoto(uid, base64) {
    return new Promise((resolve, reject) => {
        const task = firebase
            .storage()
            .ref('profile_photo/')
            .child(uid)
            .putString(base64, 'base64');
        task.on(
            'state_changed',
            taskSnapshot => {
                if (taskSnapshot.state === firebase.storage.TaskState.SUCCESS) {
                    firebase
                        .storage()
                        .ref('profile_photo/')
                        .child(uid)
                        .getDownloadURL()
                        .then(downloadURL => {
                            resolve(downloadURL);
                        })
                        .catch(() => reject());
                }
            },
            () => reject()
        );
    });
}

export function userProfile(type, id) {
    switch (type) {
        case 'student':
            return student(id);
        case 'professor':
            return professor(id);
        case 'coordinator':
            return coordinator(id);
        default:
            return null;
    }
}

export function userProfileRT(type, id, callback) {
    switch (type) {
        case 'student':
            return studentRT(id, callback);
        case 'professor':
            return professorRT(id, callback);
        case 'coordinator':
            return coordinatorRT(id, callback);
        default:
            return callback(null);
    }
}
